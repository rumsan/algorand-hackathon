import { Link, useParams } from 'react-router-dom';
import useList from '../../hooks/useList';
import { URLS } from '../../constants';
import { useEffect, useState } from 'react';

// @ts-ignore
import SideBar from '@/components/SideBar';
import { algodClient } from '@/utils/typedClient';
import { atomicTxnComposer, atomicTxnComposerFreeze } from '@/utils/atc';
import { asaId } from '@/utils/asaId';
import { useWallet } from '@txnlab/use-wallet';

import * as Tabs from '@radix-ui/react-tabs';
import { sendBtns, tabs, tabsContent } from '@/constants/classnames/tabsclassNames';
import BeneficiaryTab from '@/components/templates/BeneficiaryNotAssigned';
import usePost from '@/hooks/usePost';
import Hookpagination from '@/components/HookPagination';
import NoBeneficiary from '@/components/NoBeneficiary';
import Loader from '@/components/Loader';

//model
import React, { useRef } from 'react';
import Modal from 'react-modal';
import LoadingSpinner from '@/components/LoadingSpinner';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    border: 'none',
    display: 'flex',
    justifyContent: 'center'
  },
};

type Beneficiary = {
  uuid: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  walletAddress: string;
};

export type AssetStatus = 'NOT_ASSIGNED' | 'FREEZED' | 'UNFREEZED';

export default function ProjectBeneficiary() {
  const { id } = useParams();
  // model
  const subtitle = useRef<HTMLHeadingElement | null>(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (subtitle.current) {
      subtitle.current.style.color = '#f00';
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  // pagination state
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };
  const [tabsValue, setTabsValue] = useState<AssetStatus>('NOT_ASSIGNED');
  const [loading, setLoading] = useState<boolean>(false)

  // Refactor - Asim, please use object
  const { data, isLoading, refetch } = useList(
    `listProjectBeneficiary-${id}`,
    `${URLS.PROJECT}/${id}/beneficiaries`,
    currentPage,
    limit,
    undefined,
    undefined,
    tabsValue
  );

  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost('updateBeneficiary');

  const wallet = useWallet();

  useEffect(() => {
    refetch()
  }, [tabsValue])

  const handleCheckboxChange = (walletAddress: string) => {
    setSelectedBeneficiaries((prevSelected) =>
      prevSelected.includes(walletAddress) ? prevSelected.filter((e) => e !== walletAddress) : [...prevSelected, walletAddress]
    );
  };

  const handleSelectAll = () => {
    const allWalletAddresses = beneficiaries.map((person) => person.walletAddress);
    setSelectedBeneficiaries((prevSelected) => (prevSelected.length === allWalletAddresses.length ? [] : allWalletAddresses));
  };

  const submitTransferToken = async () => {
    setLoading(true)
    const signedTxn =
      tabsValue === 'NOT_ASSIGNED'
        ? await updateBeneficiaryData('FREEZED')
        : tabsValue === 'FREEZED'
        ? await updateBeneficiaryData('UNFREEZED')
        : await updateBeneficiaryData('FREEZED');

    await algodClient.sendRawTransaction(signedTxn).do();
    setLoading(false);
    setSelectedBeneficiaries([]);
    refetch()
    closeModal();
  };

  const [numberOfAsa, setNumberOfASA] = useState(0);
  const updateBeneficiaryData = async (status: AssetStatus) => {
    const signedTxn =
      status === 'FREEZED'
        ? await atomicTxnComposer(activeAddress as string, selectedBeneficiaries, numberOfAsa, Number(localStorage.getItem('voucherId')), sender, wallet)
        : status === 'UNFREEZED'
        ? await atomicTxnComposerFreeze(activeAddress as string, selectedBeneficiaries, Number(localStorage.getItem('voucherId')), sender, false, wallet)
        : await atomicTxnComposerFreeze(activeAddress as string, selectedBeneficiaries, Number(localStorage.getItem('voucherId')), sender, true, wallet);
    postMutation({
      urls: URLS.BENEFICIARY + '/update',
      data: {
        addresses: selectedBeneficiaries,
        status,
      },
    });
    return signedTxn;
  };

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setBeneficiaries(data.data);
      setLimit(data.limit);
      setCurrentPage(data.page);
      setTotal(data.total);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner visible={true}/>;

  return (
    <div className="flex">
      {/* <Model key={'sdf'}/> */}
      <SideBar />
      <div className="ml-64 flow-root w-screen">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 flex gap-2 sm:ml-16 sm:mt-0 sm:flex-none">
            {data?.total > 0 && (
              <Link className={sendBtns} to={`/admin/project/${id}/add-beneficiary`}>
                Add beneficiaries
              </Link>
            )}

            {selectedBeneficiaries.length > 0 && (
              <div className=''>
                
                {selectedBeneficiaries.length > 0 && tabsValue === 'NOT_ASSIGNED'
                  ? <button onClick={openModal} className={sendBtns}>Assign ASA</button>
                  : tabsValue === 'FREEZED'
                  ? <button onClick={() => submitTransferToken()} className={sendBtns}>Unfrezze ASA</button>
                  : tabsValue === 'UNFREEZED' && 
                  <button onClick={() => submitTransferToken()} className={sendBtns}>Frezze ASA</button>}
                
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >

              <div id="authentication-modal"  aria-hidden="true" className="overflow-y-auto flex overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full py-8">
              <div className=" max-h-full w-full">
  
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Transfer ASA to beneficiaries
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={closeModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
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
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Transfer {numberOfAsa} ASA to {selectedBeneficiaries.length} beneficiaries: {selectedBeneficiaries.length * numberOfAsa}</label>
                        </div>
                    </div>
                    <button type="button" className="w-full text-white bg-indigo-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading} onClick={() => submitTransferToken()}>{loading ? 'Transfering ASA to Beneficiary...' : 'Transfer'}</button>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-300">
                        Once transferred, ASA's will be frozen in beneficiary wallet. You can unfreeze it later.
                    </div>
                </form>
                          </div>
                      </div>
                  </div>
              </div> 
                </Modal>
              </div>
            )}
          </div>
        </div>
        <Tabs.Root className="flex flex-col w-[full] mt-8" defaultValue='NOT_ASSIGNED'>
          <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
            <Tabs.Trigger className={tabs} value="NOT_ASSIGNED" onClick={() => {setTabsValue('NOT_ASSIGNED'); setSelectedBeneficiaries([]);}}>
              ASA Not Assigned
            </Tabs.Trigger>
            <Tabs.Trigger className={tabs} value="FREEZED" onClick={() => {setTabsValue('FREEZED'); setSelectedBeneficiaries([]);}}>
              Freezed ASA
            </Tabs.Trigger>
            <Tabs.Trigger className={tabs} value="UNFREEZED" onClick={() => {setTabsValue('UNFREEZED'); setSelectedBeneficiaries([]);}}>
              Unfreezed ASA
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={tabsContent} value="NOT_ASSIGNED">
            {data ? <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />: <Loader />}
          </Tabs.Content>
          <Tabs.Content className={tabsContent} value="FREEZED">
            {data ? <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />: <Loader />}
          </Tabs.Content>
          <Tabs.Content className={tabsContent} value="UNFREEZED">
            {data ? <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />: <Loader />}
          </Tabs.Content>
          <div className=" pr-24">{data?.data.length === 0 && <NoBeneficiary />}</div>
        </Tabs.Root>
        <Hookpagination total={total} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage} setLimit={setLimit} />
      </div>
    </div>
  );
}
