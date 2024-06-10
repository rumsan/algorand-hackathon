/* eslint-disable no-console */
import { ReactNode, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import algosdk from 'algosdk';
import { algodClient } from '@/utils/typedClient';

/* Example usage
<RahatSendTokenToVendor
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call sendTokenToVendor"
  typedClient={typedClient}
  venderAddress={venderAddress}
  amount={amount}
  assetId={assetId}
/>
*/
type RahatSendTokenToVendorArgs = Rahat['methods']['sendTokenToVendor(address,uint64,uint64)void']['argsObj'];

type Props = {
  buttonClass: string;
  buttonLoadingNode?: ReactNode;
  buttonNode: ReactNode;
  typedClient: RahatClient;
  venderAddress: RahatSendTokenToVendorArgs['venderAddress'];
  amount: RahatSendTokenToVendorArgs['amount'];
  assetId: RahatSendTokenToVendorArgs['assetId'];
};

const RahatSendTokenToVendor = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

  const wallet = useWallet()

  const callMethod = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const sentTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      amount: 1,
      assetIndex: props.assetId as number,
      from: sender.addr,
      to: props.venderAddress,
      suggestedParams: await algodClient.getTransactionParams().do()
    })    

    const signedTxnSender = await wallet.signTransactions([sentTxn.toByte()]);

    await algodClient.sendRawTransaction(signedTxnSender).do();

    setLoading(false);
  };

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  );
};

export default RahatSendTokenToVendor;
