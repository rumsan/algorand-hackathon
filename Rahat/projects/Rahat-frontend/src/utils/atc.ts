import algosdk from "algosdk";
import { algodClient } from "./typedClient";
import { useWallet } from "@txnlab/use-wallet";
import { PeraWalletConnect } from "@perawallet/connect";


const atc = new algosdk.AtomicTransactionComposer();

const peraWallet = new PeraWalletConnect({ chainId: 416002 });

const connectWallet = async () => {
  await peraWallet.disconnect();
  await peraWallet.connect();
}

export const atomicTxnComposer = async (signerAddress: string, beneficiaryAddresses: string[], amount: number, assetId: number, sender: any) => {
  let methodInstance = algosdk.ABIMethod.fromSignature('sendTokenToBeneficiary(address,uint64,uint64)void');
  let selector = methodInstance.getSelector();
  
const suggestedParams = await algodClient.getTransactionParams().do()
    await connectWallet();
    const boxKey = algosdk.bigIntToBytes(assetId, 8);
    beneficiaryAddresses.forEach((benAddress) => {
        const txn = algosdk.makeApplicationNoOpTxnFromObject({
            from: signerAddress as string,
            appIndex: Number(import.meta.env.VITE_APP_ID),
            appArgs: [
              selector,
              algosdk.decodeAddress(benAddress).publicKey,
              algosdk.encodeUint64(amount),
              algosdk.encodeUint64(assetId),
            ],
            suggestedParams: {...suggestedParams, fee: 1000},
            foreignAssets: [assetId],
            accounts: [benAddress],
            boxes: [
              {
                appIndex: 0,
                name: boxKey,
              },
            ],
          });
        
        atc.addTransaction({ txn, signer: sender.signer })
    })

  const signedTxn = await peraWallet.signTransaction([atc.buildGroup()]);

    return signedTxn;
    
}

export const atomicTxnComposerFreeze = async (signerAddress: string, beneficiaryAddresses: string[], assetId: number, sender: any, freeze: boolean) => {
  let methodInstance = 
  freeze ? 
  algosdk.ABIMethod.fromSignature('freezeBeneficiaryAsset(address,uint64)void') 
  : 
  algosdk.ABIMethod.fromSignature('unfreezeBeneficiaryAsset(address,uint64)void');

  const suggestedParams = await algodClient.getTransactionParams().do()
  let selector = methodInstance.getSelector();
  await connectWallet();
  const boxKey = algosdk.bigIntToBytes(assetId, 8);
  beneficiaryAddresses.forEach((benAddress) => {
      const txn = algosdk.makeApplicationNoOpTxnFromObject({
          from: signerAddress as string,
          appIndex: Number(import.meta.env.VITE_APP_ID),
          appArgs: [
            selector,
            algosdk.decodeAddress(benAddress).publicKey,
            algosdk.encodeUint64(assetId),
          ],
          suggestedParams: {...suggestedParams, fee: 1000},
          foreignAssets: [assetId],
          accounts: [benAddress],
          boxes: [
            {
              appIndex: 0,
              name: boxKey,
            },
          ],
        });
      
      atc.addTransaction({ txn, signer: sender.signer })
  })

  const signedTxn = await peraWallet.signTransaction([atc.buildGroup()])

  return signedTxn;
  
}

