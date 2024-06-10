import { Link, useParams } from 'react-router-dom';
import useList from '../../hooks/useList';
import { URLS } from '../../constants';
import { useEffect, useState } from 'react';

// @ts-ignore
import Jdenticon from 'react-jdenticon';
import TruncatedCell from '@/components/TruncatedCell';
import SideBar from '@/components/SideBar';
import { algodClient } from '@/utils/typedClient';
import { atomicTxnComposer, atomicTxnComposerFreeze } from '@/utils/atc';
import { asaId } from '@/utils/asaId';
import { useWallet } from '@txnlab/use-wallet';

import * as Tabs from '@radix-ui/react-tabs';
import BeneficiaryNotAssigned from '@/components/templates/BeneficiaryNotAssigned';
import { sendBtns, tabs, tabsContent } from '@/constants/classnames/tabsclassNames';
import BeneficiaryTab from '@/components/templates/BeneficiaryNotAssigned';
import usePost from '@/hooks/usePost';
import Hookpagination from '@/components/HookPagination';
import NoBeneficiary from '@/components/NoBeneficiary';
import Loader from '@/components/Loader';
import Model from '@/components/Model';

//model
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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

  // Refactor - Asim, please use object
  const { data, isLoading } = useList(
    `listProjectBeneficiary-${tabsValue}`,
    `${URLS.PROJECT}/${id}/beneficiaries`,
    currentPage,
    limit,
    undefined,
    undefined,
    tabsValue
  );

  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost('updateBeneficiary');

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
    const signedTxn =
      tabsValue === 'NOT_ASSIGNED'
        ? await updateBeneficiaryData('FREEZED')
        : tabsValue === 'FREEZED'
        ? await updateBeneficiaryData('UNFREEZED')
        : await updateBeneficiaryData('UNFREEZED');

    await algodClient.sendRawTransaction(signedTxn).do();
  };

  const [numberOfAsa, setNumberOfASA] = useState(0);
  const updateBeneficiaryData = async (status: AssetStatus) => {
    const signedTxn =
      status === 'NOT_ASSIGNED'
        ? await atomicTxnComposer(activeAddress as string, selectedBeneficiaries, numberOfAsa, asaId, sender)
        : status === 'FREEZED'
        ? await atomicTxnComposerFreeze(activeAddress as string, selectedBeneficiaries, asaId, sender, true)
        : await atomicTxnComposerFreeze(activeAddress as string, selectedBeneficiaries, asaId, sender, false);
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

  if (isLoading) return <Loader />;
  console.log('data', data);

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
                <button onClick={openModal}>Open Modal</button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div className="text-xl ">Enter number of token</div>
                  <form>
                    <input
                      className="p-2 border-gray-500"
                      type="number"
                      placeholder="1"
                      value={numberOfAsa === undefined ? '' : numberOfAsa}
                      onChange={(e) => setNumberOfASA(Number(e.target.value))}
                    />
                    <button onClick={() => submitTransferToken()} type="button" className={sendBtns}>
                      {tabsValue === 'NOT_ASSIGNED'
                        ? 'Assign Token'
                        : tabsValue === 'FREEZED'
                        ? 'UnFreeze Token'
                        : tabsValue === 'UNFREEZED'
                        ? 'Unfreeze Token'
                        : 'Assign Token'}
                    </button>
                    <button className="" onClick={closeModal}>
                      close
                    </button>
                  </form>
                </Modal>
              </div>

              // <button onClick={() => submitTransferToken()} type="button" className={sendBtns}>
              //   {tabsValue === 'NOT_ASSIGNED'
              //     ? 'Assign Token'
              //     : tabsValue === 'FREEZED'
              //     ? 'UnFreeze Token'
              //     : tabsValue === 'UNFREEZED'
              //     ? 'Unfreeze Token'
              //     : 'Assign Token'}
              // </button>
            )}
          </div>
        </div>
        <Tabs.Root className="flex flex-col w-[full] mt-8" defaultValue="not_assigned">
          <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
            <Tabs.Trigger className={tabs} value="not_assigned" onClick={() => setTabsValue('NOT_ASSIGNED')}>
              ASA Not Assigned
            </Tabs.Trigger>
            <Tabs.Trigger className={tabs} value="freezed" onClick={() => setTabsValue('FREEZED')}>
              Freezed ASA
            </Tabs.Trigger>
            <Tabs.Trigger className={tabs} value="unfreezed" onClick={() => setTabsValue('UNFREEZED')}>
              Unfreezed ASA
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={tabsContent} value="not_assigned">
            <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />
          </Tabs.Content>
          <Tabs.Content className={tabsContent} value="freezed">
            <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />
          </Tabs.Content>
          <Tabs.Content className={tabsContent} value="unfreezed">
            <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />
          </Tabs.Content>
          <div className=" pr-24">{data?.data.length === 0 && <NoBeneficiary />}</div>
        </Tabs.Root>
        <Hookpagination total={total} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage} setLimit={setLimit} />
      </div>
    </div>
  );
}
