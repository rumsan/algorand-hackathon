/* eslint-disable no-console */
import { ReactNode, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';

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
  // console.log('props', props)
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

  const callMethod = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log(`Calling sendTokenToVendor`);
    await props.typedClient.sendTokenToVendor(
      {
        venderAddress: props.venderAddress,
        amount: props.amount,
        assetId: props.assetId,
      },
      { sender, accounts: [props?.venderAddress], sendParams: { fee: new AlgoAmount({ algos: 0.003 }) } }
    );
    setLoading(false);
  };

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  );
};

export default RahatSendTokenToVendor;
