import React, { useEffect, useState } from 'react';
import { generateRandomBeneficiaryAccount } from '../../utils/generateRandomBenAccount';
import { QRCodeSVG } from 'qrcode.react';
import CryptoJS from 'crypto-js';
import * as algosdk from 'algosdk';
import { algodClient, typedClient } from '../../utils/typedClient';
import { URLS } from '../../constants';
import usePost from '../../hooks/usePost';
import { useWallet } from '@txnlab/use-wallet';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import success from '../../components/Toaster';
import {SnackbarUtilsConfigurator} from '../../components/Toaster'
import * as snack from '../../components/Toaster';

interface WalletType {
    mnemonicsQRText: string | undefined;
    walletAddress: string | undefined;
    secretKey: Uint8Array | undefined;
}

const CreateBeneficiary = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const notify = () => (data.email ? toast('Wow so easy!') : toast('There was a problem with your request'));

  // const notify = () => toast('Wow so easy!');
  const { postMutation, data, isSuccess, success, isPending } = usePost('false');

const secretKey = 'your-secret-key';

  const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const [loading, setLoading] = useState(false)

  const mnemonicsOfSender = 'announce ivory almost shine hotel stage final ordinary clay sing away make typical emotion slim cloud spray matrix story lobster bargain kidney also abandon hope'
  const walletOfSender = 'GXJCRWIOC2QHB2VHWZ3ABAKOZBISP32QBUY2FNHMZBQIU3GO3IU7NR2YY4'

  const [beneficiaryWallet, setBeneficiaryWallet] = useState<WalletType>({ mnemonicsQRText: undefined, walletAddress: undefined, secretKey: undefined });
  const createBeneficiaryWallet = () => {
    const { mnemonics, walletAddress, secretKey } = generateRandomBeneficiaryAccount();
    const mnemonicsQRText = `{"version":"1.0", "mnemonic":"${mnemonics}"}`;
    setBeneficiaryWallet({ mnemonicsQRText, walletAddress, secretKey });
  };

  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const createBeneficiary = async(e: any) => {
    e.preventDefault();
    setLoading(true)
    const encryptedPassword = encryptData(beneficiaryWallet?.mnemonicsQRText as string);
    const data = {
      email: e.target['email'].value,
      name: e.target['firstName'].value,
      age: Number(e.target['age'].value),
      gender: e.target['gender'].value,
      walletAddress: beneficiaryWallet?.walletAddress,
      mnemonics: encryptedPassword,
    };

    // Send tokens to beneficiary from sender wallet
    const secretOfSenderWallet = algosdk.mnemonicToSecretKey(mnemonicsOfSender)
    const txnSender = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: walletOfSender,
      to: data.walletAddress as string,
      amount: 500000,
      suggestedParams: await algodClient.getTransactionParams().do()
    });
    const signedTxnSender = txnSender.signTxn(secretOfSenderWallet.sk);
    await algodClient.sendRawTransaction(signedTxnSender).do();

    // Optin to asset using beneficiary wallet
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: data.walletAddress as string,
      to: data.walletAddress as string,
      amount: 0,
      suggestedParams: await algodClient.getTransactionParams().do(),
      assetIndex: 672431347
    });
    const signedTxn = txn.signTxn(beneficiaryWallet.secretKey as Uint8Array);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

    postMutation({ urls: URLS.BENEFICIARY + '/create-ben', data });

    if(data.email){
      // Toast logic here
      setLoading(false)
    } else{
      console.log(false, 'res')
    await postMutation({ urls: URLS.BENEFICIARY + '/create-ben', data });
  };
}

  if (shouldNavigate) {
    // toast.success('Beneficiary created successfully');

    return <Navigate to="/admin/beneficiary" replace />;
  }

  return (
    <>
      <div>
        
        <SnackbarUtilsConfigurator />
      </div>
      <form onSubmit={(e) => createBeneficiary(e)}>
        <div className="space-y-6">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Create A New Beneficiary</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Wallet Address</label>
                <div className="mt-2 flex w-full gap-[2%]">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-[60%] px-2"
                    value={beneficiaryWallet?.walletAddress}
                    disabled
                  />
                  <button
                    type="button"
                    className="rounded-md bg-gray-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-[40%]"
                    onClick={createBeneficiaryWallet}
                  >
                    Generate wallet
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="age"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="gender"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
            </div>

            {beneficiaryWallet?.mnemonicsQRText && (
              <div className="mt-6">
                <label className="block text-sm font-medium leading-6 text-gray-500">QR code of beneficiary wallet secret.</label>
                <div className="mt-4">
                  <QRCodeSVG value={beneficiaryWallet?.mnemonicsQRText as string} />
                </div>
              </div>
            )}
            <div className="mt-12 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 w-[40%] focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Creating asset..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </form>
      {}
    </>
  );
};


export default CreateBeneficiary
