/* eslint-disable no-console */
import { ReactNode, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import usePost from '@/hooks/usePost';
import { URLS } from '@/constants';
import algosdk from 'algosdk';
import { asaId } from '@/utils/asaId';
import * as snack from '../../components/Toaster';

type RahatFreezeBeneficiaryAssetArgs = Rahat['methods']['freezeBeneficiaryAsset(address,uint64)void']['argsObj'];

type Props = {
  buttonClass: string;
  buttonLoadingNode?: ReactNode;
  buttonNode: ReactNode;
  typedClient: RahatClient;
  benAddress: RahatFreezeBeneficiaryAssetArgs['benAddress'];
  assetId: RahatFreezeBeneficiaryAssetArgs['assetId'];
};

const RahatFreezeBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };
  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost('updateBeneficiary');

  const callMethod = async () => {
    setLoading(true);
    console.log(`Calling freezeBeneficiaryAsset`);
    const boxKey = algosdk.bigIntToBytes(Number(localStorage.getItem('voucherId')), 8);
    const res = await props.typedClient.freezeBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
      },
      {
        sender,
        assets: [Number(localStorage.getItem('voucherId'))],
        accounts: [props.benAddress],
        sendParams: { fee: new AlgoAmount({ algos: 0.003 }) },
        boxes: [
          {
            appIndex: 0,
            name: boxKey,
          },
        ],
      }
    );

    if (res) {
      postMutation({
        urls: URLS.BENEFICIARY + '/update',
        data: {
          addresses: [props?.benAddress],
          status: 'FREEZED',
        },
      });
      snack.default.success('Beneficiary asset unfreezed successfully.');

      setLoading(false);
      // window.location.reload();
    }
  };

  return (
    <button type="submit" className=" block px-3 py-1 text-sm leading-6 text-red-900" onClick={callMethod}>
      Freeze
      {/* {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode} */}
    </button>
  );
};

export default RahatFreezeBeneficiaryAsset;
