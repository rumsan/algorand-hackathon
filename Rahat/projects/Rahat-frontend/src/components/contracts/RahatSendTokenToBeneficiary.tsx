/* eslint-disable no-console */
import { ReactNode, useRef, useState } from 'react';
import { Rahat, RahatClient } from '../../contracts/RahatClient';
import { useWallet } from '@txnlab/use-wallet';
import algosdk, { Transaction } from 'algosdk';
import { algodClient } from '../../utils/typedClient';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { asaId } from '@/utils/asaId';
import { PeraWalletConnect } from '@perawallet/connect';
import { atomicTxnComposer } from '@/utils/atc';
import { URLS } from '@/constants';
import usePost from '@/hooks/usePost';
import Modal from 'react-modal';

type RahatSendTokenToBeneficiaryArgs = Rahat['methods']['sendTokenToBeneficiary(address,uint64,uint64)void']['argsObj'];

type Props = {
  buttonClass: string;
  buttonLoadingNode?: ReactNode;
  buttonNode: ReactNode;
  typedClient: RahatClient;
  benAddress: RahatSendTokenToBeneficiaryArgs['benAddress'];
  amount?: RahatSendTokenToBeneficiaryArgs['amount'];
  assetId: RahatSendTokenToBeneficiaryArgs['assetId'];
  setIsOpen?: any
};

const RahatSendTokenToBeneficiary = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };
  const subtitle = useRef<HTMLHeadingElement | null>(null);

  const [numberOfAsa, setNumberOfASA] = useState(0);

  let methodInstance = algosdk.ABIMethod.fromSignature('sendTokenToBeneficiary(address,uint64,uint64)void');
  let selector = methodInstance.getSelector();
  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost('updateBeneficiary');

  const callMethod = async () => {
    setLoading(true);

    const boxKey = algosdk.bigIntToBytes(asaId, 8);

    const res = await props.typedClient.sendTokenToBeneficiary(
      {
        benAddress: props?.benAddress,
        amount: numberOfAsa,
        assetId: asaId,
      },
      {
        sender,
        assets: [asaId],
        accounts: [props?.benAddress],
        sendParams: { fee: new AlgoAmount({ algos: 0.003 }) },
        boxes: [
          {
            appIndex: 0,
            name: boxKey,
          },
        ],
      }
    );

    res &&
      postMutation({
        urls: URLS.BENEFICIARY + '/update',
        data: {
          addresses: [props?.benAddress],
          status: 'FREEZED',
        },
      });

    props.setIsOpen(false)
    setLoading(false);
  };


  return (
    <>
<<<<<<< HEAD
      <div id="authentication-modal" aria-hidden="true" className="overflow-y-auto flex overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full py-8">
          <div className="w-full max-h-full w-full">
=======
      <Modal
        isOpen={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Send ASA"
      >

        <div id="authentication-modal" aria-hidden="true" className="overflow-y-auto flex overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full py-8">
          <div className="w-full max-h-full ">
>>>>>>> 2495ae83b8c4e4db6346f4778bfabc82fd419472

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Transfer ASA to beneficiaries
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => props.setIsOpen(false)}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount of ASA</label>
                    <input type="number" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required
                      value={numberOfAsa === undefined ? '' : numberOfAsa}
                      onChange={(e) => setNumberOfASA(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Transfer {numberOfAsa} ASA</label>
                    </div>
                  </div>
                  <button type="button" className="w-full text-white bg-indigo-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={callMethod}>Transfer</button>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-300">
                    Once transferred, ASA's will be frozen in beneficiary wallet. You can unfreeze it later.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      {/* <button type="submit" className="block px-5 py-1 text-sm leading-6 text-gray-900" onClick={callMethod}>
        Send ASA
      </button> */}
    </>

  );
};

export default RahatSendTokenToBeneficiary;
