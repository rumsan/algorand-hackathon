/* eslint-disable no-console */
import { ReactNode, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';
import { algodClient } from '@/utils/typedClient';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';

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

  const callMethod = async () => {
    await props.typedClient.unfreezeBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
      },
      { sender, assets: [props.assetId as number], sendParams: { fee: new AlgoAmount({ algos: 0.003 }) }, accounts: [props.benAddress] }
    );
    setLoading(false);
  };

  return (
    <button type="submit" className="fblock px-3 py-1 text-sm leading-6 text-green-900" onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  );
};

export default RahatUnfreezeBeneficiaryAsset;
