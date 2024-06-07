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
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  // const peraWallet = new PeraWalletConnect({chainId: 416002});

  const multisigParams = {
    version: 1,
    threshold: 2,
    addrs: [
        'QZNFM5ZXEEOUK5BLV7ZWUZNFKPC3XFOWATOGZXNAWGVHYESMIJ5CFRCEDE',
        'RL7LKMB4W7EH7IDBIRJMF2ICUWGVXJ7YMNWPTYGEYJA2A3ZYZWFS6S5I4Q',
        'BQ63F7VH6FYQNFUK6YN6FGHI55FPE74FJT7EQ4NMBKHPT3QFSWJGXPPISA'
    ]
};

// console.log(peraWallet)

const multisigAddress = algosdk.multisigAddress(multisigParams);

console.log("multisigAddress", multisigAddress)

const createAppCallTxn = async (): Promise<SignerTransaction[]> => {

  // const createMethodSelector = algosdk.getMethodByName(contract.methods, 'unfreezeBeneficiaryAsset').getSelector()

  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeApplicationCallTxnFromObject({
    from: 'GXJCRWIOC2QHB2VHWZ3ABAKOZBISP32QBUY2FNHMZBQIU3GO3IU7NR2YY4',
    appIndex: Number(import.meta.env.VITE_APP_ID),
    appArgs: [
      new TextEncoder().encode("add(uint64,uint64)uint128"),
        new Uint8Array(Buffer.from('asdf')),
        new Uint8Array(Buffer.from('asdf')),
    ],
    suggestedParams,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
});
  return [{txn: txn, signers: ['BQ63F7VH6FYQNFUK6YN6FGHI55FPE74FJT7EQ4NMBKHPT3QFSWJGXPPISA']}];
};


  const callMethod = async () => {
    // const formattedTxn = await createAppCallTxn();

    // const signedTxn = formattedTxn[0].txn.signTxn(algosdk.mnemonicToSecretKey(import.meta.env.VITE_FUNDER_MNEMONICS).sk)

    // const sendTxn = await algodClient.sendRawTransaction(signedTxn).do();

    // await peraWallet.disconnect()
    // await peraWallet.connect()
    // .then(async (res) => {
    //   const formattedTxn = await createAppCallTxn();

    //   console.log(formattedTxn[0].txn)

    //   const decoder = new TextDecoder()

    //   // const appArs = decoder.decode(formattedTxn[0].txn.appArgs[1])

    //   // console.log("decoded app args", appArs)

      

    //   // const signedTxn = await peraWallet.signTransaction([formattedTxn]);
      
    //   // const appendedMsigTxn = algosdk.appendSignRawMultisigSignature(signedTxn[0], multisigParams, 'RL7LKMB4W7EH7IDBIRJMF2ICUWGVXJ7YMNWPTYGEYJA2A3ZYZWFS6S5I4Q', signedTxn[0])

    //   // console.log(appendedMsigTxn)
    //   // const sendTxn = await algodClient.sendRawTransaction(signedTxn).do();
    // })
    // .catch((err) => {
    //   console.log(err)
    // })   

    
    
    const res = await props.typedClient.unfreezeBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
      },
      { sender,
        assets: [Number(localStorage.getItem('voucherId'))],
        sendParams: {fee: new AlgoAmount({algos: 0.003})},
        accounts: [props.benAddress]
       },
    )

    console.log(res)
    setLoading(false)
  }

  return (
    <button type="submit" className="fblock px-3 py-1 text-sm leading-6 text-green-900" onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  );
};

export default RahatUnfreezeBeneficiaryAsset;
