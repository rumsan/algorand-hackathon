import { asaId } from '@/utils/asaId';
import { stringToUint8Array } from '@/utils/stringToUint8Array';
import { algodClient } from '@/utils/typedClient';
import { PeraWalletConnect } from '@perawallet/connect';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';
import algosdk from 'algosdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const Clawback = () => {

    const { projectId } = useParams();

    let methodInstance = algosdk.ABIMethod.fromSignature('unfreezeBeneficiaryAsset(address,uint64)void');
    let selector = methodInstance.getSelector();

    const [initiateTxn, setInitiateTxn] = useState<boolean>();
    const [finalizeTxn, setFinalizeTxn] = useState<boolean>();
    const [disabled, setDisabled] = useState<boolean>(false);
    const [connectedWallet, setConnectedWallet] = useState<string>();
    const [signersDetails, setSignersDetails] = useState<any>();

    const peraWallet = new PeraWalletConnect({chainId: 416002});

    const multisigParams = {
        version: 1,
        threshold: 1,
        addrs: [
            '3BZYCOTA7A3R45ZKUXCG72GCVKIMVDX5PMZMMC7YG72HXS4XKETU4SDLTA',
            'NDYN2YSKD55TZAPGLFSXJ5TVUWE25L5TXEYBFH3AYQ7SATCOQMYTJRF2PY',
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
            row.walletAddress === accounts[0] && setDisabled(false)
        }
        )
    }

    useEffect(() => {
        fetchTxn();
    }, [])

    const createAppCallTxn = async (): Promise<SignerTransaction[]> => {
        const boxKey = algosdk.bigIntToBytes(asaId, 8);
        const suggestedParams = await algodClient.getTransactionParams().do();
        const txn = algosdk.makeApplicationNoOpTxnFromObject({
            from: connectedWallet as string,
            appIndex: Number(import.meta.env.VITE_APP_ID),
            appArgs: [
              selector,
              algosdk.decodeAddress('QZNFM5ZXEEOUK5BLV7ZWUZNFKPC3XFOWATOGZXNAWGVHYESMIJ5CFRCEDE').publicKey,
              algosdk.encodeUint64(10),
              algosdk.encodeUint64(asaId),
            ],
            suggestedParams: {...suggestedParams, fee: 1000},
            foreignAssets: [asaId],
            accounts: ['QZNFM5ZXEEOUK5BLV7ZWUZNFKPC3XFOWATOGZXNAWGVHYESMIJ5CFRCEDE'],
            boxes: [
              {
                appIndex: 0,
                name: boxKey,
              },
            ],
          });
        return [{txn: txn, signers: [connectedWallet as string]}];
      };

    const initiateOrAddTxnCall = async () => {
        

        await peraWallet.disconnect()
        await peraWallet.connect()

        const formattedTxn = await createAppCallTxn();

        const signedTxn = await peraWallet.signTransaction([formattedTxn])

        // const sendTxn = await algodClient.sendRawTransaction(signedTxn).do();
        
        const payload = {
            signature: signedTxn.toString(),
            walletAddress: connectedWallet as string,
            projectId : projectId
        }

        await axios.post('http://localhost:5500/api/v1/multisig', payload)
    }
    
    const finalizeTxnCall = async () => {
        await peraWallet.disconnect()
        await peraWallet.connect()

        const formattedTxn = await createAppCallTxn();
        const signedTxn = await peraWallet.signTransaction([formattedTxn]);

        // const decodedSignedTxn1 = algosdk.decodeSignedTransaction(signedTxn[0])
        // const decodedSignedTxn2 = algosdk.decodeSignedTransaction(signedTxn[0])

        // const rawSignature1 = decodedSignedTxn1.msig?.subsig[0].s
        // const rawSignature2 = decodedSignedTxn2.msig?.subsig[0].s

        // const appended1 = algosdk.appendSignRawMultisigSignature(
        //     signedTxn[0],
        //     multisigParams,
        //     'signerAddr1',
        //     rawSignature1 as Uint8Array
        //   );

        //   const appended2 = algosdk.appendSignRawMultisigSignature(
        //     appended1.blob,
        //     multisigParams,
        //     connectedWallet as string,
        //     rawSignature2 as Uint8Array
        //   );

        // await algodClient.sendRawTransaction(appended2.blob).do();

        // Finalize
        const decodedSignedTxn = algosdk.decodeSignedTransaction(signedTxn[0])
        console.log(decodedSignedTxn)
        const rawSign1 = decodedSignedTxn.msig?.subsig[0].pk

        console.log(rawSign1)

        console.log("reached")

        let combinedFinalizeTxn = algosdk.appendSignRawMultisigSignature(
            signedTxn[0],
            multisigParams,
            connectedWallet as string,
            rawSign1 as Uint8Array
          );

        

        signersDetails?.forEach((txn:any) => {
            const decodedTxn = algosdk.decodeSignedTransaction(stringToUint8Array(txn.signature))
            const rawSign = decodedTxn.msig?.subsig[0].s
            const finalTxn = algosdk.appendSignRawMultisigSignature(
                combinedFinalizeTxn.blob,
                multisigParams,
                txn.walletAddress as string,
                rawSign as Uint8Array
              );

            combinedFinalizeTxn = finalTxn;
        })

        console.log(combinedFinalizeTxn)

        // await axios.delete(`http://localhost:5500/api/v1/multisig/${projectId}`)
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
        <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6" onClick={finalizeTxnCall}>
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