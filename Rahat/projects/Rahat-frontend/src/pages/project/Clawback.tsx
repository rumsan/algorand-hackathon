import { algodClient } from '@/utils/typedClient';
import { PeraWalletConnect } from '@perawallet/connect';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';
import algosdk from 'algosdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const Clawback = () => {

    const { projectId } = useParams();

    let methodInstance = algosdk.ABIMethod.fromSignature('clawbackBeneficiaryAsset(address,asset,uint64)void');
    let selector = methodInstance.getSelector();

    const [initiateTxn, setInitiateTxn] = useState<boolean>();
    const [finalizeTxn, setFinalizeTxn] = useState<boolean>();
    const [disabled, setDisabled] = useState<boolean>(false);
    const [connectedWallet, setConnectedWallet] = useState<string>();
    const [signersDetails, setSignersDetails] = useState<any>();

    const peraWallet = new PeraWalletConnect({chainId: 416002});

    const multisigParams = {
        version: 1,
        threshold: 2,
        addrs: [
            'QZNFM5ZXEEOUK5BLV7ZWUZNFKPC3XFOWATOGZXNAWGVHYESMIJ5CFRCEDE',
            'RL7LKMB4W7EH7IDBIRJMF2ICUWGVXJ7YMNWPTYGEYJA2A3ZYZWFS6S5I4Q',
            'BQ63F7VH6FYQNFUK6YN6FGHI55FPE74FJT7EQ4NMBKHPT3QFSWJGXPPISA'
        ]
    };

    const fetchTxn = async () => {
        const res = await axios.get(`http://localhost:5500/api/v1/multisig/${projectId}`);
        res?.data.length === 0 && setInitiateTxn(true);
        res?.data.length === Number(import.meta.env.VITE_MSIG_THRESHOLD)  && setFinalizeTxn(true);

        const accounts = await peraWallet.reconnectSession();
        setConnectedWallet(accounts[0])

        setSignersDetails(res?.data)

        res?.data.forEach((row:any) => {
            row.walletAddress === accounts[0] && setDisabled(true)
        }
        )
    }

    useEffect(() => {
        fetchTxn();
    }, [])

    const createAppCallTxn = async (): Promise<SignerTransaction[]> => {

        const suggestedParams = await algodClient.getTransactionParams().do();
        const txn = algosdk.makeApplicationCallTxnFromObject({
          from: connectedWallet as string,
          appIndex: Number(import.meta.env.VITE_APP_ID),
          appArgs: [
            selector, 
            new Uint8Array(Buffer.from('NAS')), 
            new Uint8Array(1),
            new Uint8Array(1),
            ],
          suggestedParams: {...suggestedParams,
             fee: 1000
            },
            foreignAssets: [Number(import.meta.env.VITE_ASA_ID)],
          onComplete: algosdk.OnApplicationComplete.NoOpOC,
          accounts: [connectedWallet as string],
        });
        return [{txn: txn, signers: [connectedWallet as string]}];
      };

    const initiateOrAddTxnCall = async () => {
        

        await peraWallet.disconnect()
        await peraWallet.connect()

        const formattedTxn = await createAppCallTxn();

        // const signedTxn = formattedTxn[0].txn.signTxn(algosdk.mnemonicToSecretKey(import.meta.env.VITE_FUNDER_MNEMONICS).sk)

        const signedTxn = await peraWallet.signTransaction([formattedTxn])

        console.log(signedTxn)

        // const sendTxn = await algodClient.sendRawTransaction(signedTxn).do();


        // 
        
        const payload = {
            signature: signedTxn.toString(),
            walletAddress: connectedWallet as string,
            projectId : projectId
        }

        await axios.post('http://localhost:5500/api/v1/multisig', payload)
    }
    
    const finalizeTxnCall = async () => {
        const formattedTxn = await createAppCallTxn();
        const signedTxn = await peraWallet.signTransaction([formattedTxn]);

        let appendedTxn: Uint8Array | Uint8Array[];

        signersDetails?.forEach((txn:any) => {
            appendedTxn = algosdk.appendSignRawMultisigSignature(txn.signature, multisigParams, txn.walletAddress, signedTxn[0])
        })

        const sendTxn = await algodClient.sendRawTransaction(appendedTxn).do()

        await axios.delete(`http://localhost:5500/api/v1/multisig/${projectId}`)
    }

  return (
    <>
    <h1>Multisig Clawback Beneficiary Asset</h1>

    {signersDetails?.length > 0 && 
    <>
        This txn has already been signed by
        <ul>
            {signersDetails?.map((signer:any) => <li>{signer?.walletAddress}</li>)}
        </ul>
    </>
    }

    {initiateTxn && !disabled && 
        <>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6" onClick={initiateOrAddTxnCall}>
        Initiate txn
        </button>
        </>
    }

    {!initiateTxn && !finalizeTxn && !disabled && 
        <>
        <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6" onClick={initiateOrAddTxnCall}>
        Add txn
        </button>
        </>
    }

    {finalizeTxn && !disabled && 
        <>
        <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6" onClick={initiateOrAddTxnCall}>
        Finalize txn
        </button>
        </>
    }

    {disabled && 
        <>You have already signed the txn. Please wait for confirmation by others or clear msig for this clawback.</>
    }

    </>
  )
}

export default Clawback