/* eslint-disable no-console */
import { ReactNode, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import algosdk, { Transaction } from 'algosdk';
import { algodClient } from '../../utils/typedClient';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { asaId } from '@/utils/asaId';
import { PeraWalletConnect } from '@perawallet/connect';
import { atomicTxnComposer } from '@/utils/atc';

type RahatSendTokenToBeneficiaryArgs = Rahat['methods']['sendTokenToBeneficiary(address,uint64,uint64)void']['argsObj'];

type Props = {
  buttonClass: string;
  buttonLoadingNode?: ReactNode;
  buttonNode: ReactNode;
  typedClient: RahatClient;
  benAddress: RahatSendTokenToBeneficiaryArgs['benAddress'];
  amount: RahatSendTokenToBeneficiaryArgs['amount'];
  assetId: RahatSendTokenToBeneficiaryArgs['assetId'];
};

const RahatSendTokenToBeneficiary = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

  const atc = new algosdk.AtomicTransactionComposer();

  const peraWallet = new PeraWalletConnect({chainId: 416002});

  let methodInstance = algosdk.ABIMethod.fromSignature('sendTokenToBeneficiary(address,uint64,uint64)void');
    let selector = methodInstance.getSelector();
   
  const callMethod = async () => {

    setLoading(true);

    const boxKey = algosdk.bigIntToBytes(asaId, 8);

    await props.typedClient.sendTokenToBeneficiary(
      {
        benAddress: props?.benAddress,
        amount: props?.amount,
        assetId: asaId,
      },
      {
        sender,
        assets: [asaId],
        accounts: [props?.benAddress],
        sendParams: { fee: new AlgoAmount({ algos: 0.003 }) },
        boxes: [{
          appIndex: 0,
          name: boxKey,
          }]
      }
    );
    
    setLoading(false);
  };

  return (
    <button type="submit" className="block px-5 py-1 text-sm leading-6 text-gray-900" onClick={callMethod}>
      {' '}
      Send ASA
    </button>
  );
};

export default RahatSendTokenToBeneficiary;
