/* eslint-disable no-console */
import { ReactNode, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';
import { algodClient } from '@/utils/typedClient';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';
import { asaId } from '@/utils/asaId';
import * as snack from '../../components/Toaster';
import { URLS } from '@/constants';
import usePost from '@/hooks/usePost';

type RahatUnfreezeBeneficiaryAssetArgs = Rahat['methods']['unfreezeBeneficiaryAsset(address,uint64)void']['argsObj'];

type Props = {
  buttonClass: string;
  buttonLoadingNode?: ReactNode;
  buttonNode: ReactNode;
  typedClient: RahatClient;
  benAddress: RahatUnfreezeBeneficiaryAssetArgs['benAddress'];
  assetId: RahatUnfreezeBeneficiaryAssetArgs['assetId'];
};

const RahatUnfreezeBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost('updateBeneficiary');

  const callMethod = async () => {
    const boxKey = algosdk.bigIntToBytes(Number(localStorage.getItem('voucherId')), 8);

    const res = await props.typedClient.unfreezeBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
      },
      {
        sender,
        assets: [Number(localStorage.getItem('voucherId'))],
        sendParams: { fee: new AlgoAmount({ algos: 0.003 }) },
        accounts: [props.benAddress],
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
          status: 'UNFREEZED',
        },
      });
      snack.default.success('Beneficiary asset freezed successfully.');
      setLoading(false);

      // res && window.location.reload();
    }
  };

  return (
    <button type="submit" className="fblock ml-3 px-3 pb-3 text-sm leading-6 text-green-900" onClick={callMethod}>
      {loading ? 'Transating' : 'Unfreeze asset'}
    </button>
  );
};

export default RahatUnfreezeBeneficiaryAsset;
