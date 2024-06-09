import { Link, useParams } from 'react-router-dom';
import useList from '../../hooks/useList';
import { URLS } from '../../constants';
import { useEffect, useState } from 'react';

// @ts-ignore
import Jdenticon from 'react-jdenticon';
import TruncatedCell from '@/components/TruncatedCell';
import SideBar from '@/components/SideBar';
import { algodClient } from '@/utils/typedClient';
import { atomicTxnComposer } from '@/utils/atc';
import { asaId } from '@/utils/asaId';
import { useWallet } from '@txnlab/use-wallet';

import * as Tabs from '@radix-ui/react-tabs';
import BeneficiaryNotAssigned from '@/components/templates/BeneficiaryNotAssigned';
import { sendBtns, tabs, tabsContent } from '@/constants/classnames/tabsclassNames';
import BeneficiaryTab from '@/components/templates/BeneficiaryNotAssigned';
import usePost from '@/hooks/usePost';
import Hookpagination from '@/components/HookPagination';
import NoProjects from '@/components/NoProjects';
import NoBeneficiary from '@/components/NoBeneficiary';
import Loader from '@/components/Loader';

type Beneficiary = {
  uuid: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  walletAddress: string;
};

type AssetStatus = 'NOT_ASSIGNED' | 'FREEZED' | 'UNFREEZED';

export default function ProjectBeneficiary() {
  const { id } = useParams();

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
  const { data,isLoading } = useList(`listProjectBeneficiary-${tabsValue}`, `${URLS.PROJECT}/${id}/beneficiaries`, currentPage, limit, undefined, undefined, tabsValue);

  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost("updateBeneficiary");

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
    tabsValue === 'NOT_ASSIGNED' ?
    await updateBeneficiaryData('FREEZED')
    : 
    tabsValue === 'FREEZED' ?
    await updateBeneficiaryData('UNFREEZED')
    :
    await updateBeneficiaryData('UNFREEZED')

    await algodClient.sendRawTransaction(signedTxn).do()

    };
  
    const updateBeneficiaryData = async (status: AssetStatus) => {
    const signedTxn = await atomicTxnComposer(activeAddress as string, selectedBeneficiaries, 1, asaId, sender);
    postMutation({ 
        urls: URLS.BENEFICIARY + '/update',
        data: {
        addresses: selectedBeneficiaries,
        status
        } 
      })
    return signedTxn;
    }

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setBeneficiaries(data.data);
      setLimit(data.limit);
      setCurrentPage(data.page);
      setTotal(data.total);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 flow-root w-screen">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 flex gap-2 sm:ml-16 sm:mt-0 sm:flex-none">
            {data?.total > 0 && (
              <Link
                className={sendBtns}
                to={`/admin/project/${id}/add-beneficiary`}
              >
                Add beneficiaries
              </Link>
            )}
            {selectedBeneficiaries.length > 0 && (
              <button
                onClick={() => submitTransferToken()}
                type="button"
                className={sendBtns}
              >
                Transfer Token
              </button>
            )}
          </div>
        </div>
        <Tabs.Root className="flex flex-col w-[full] mt-8" defaultValue="not_assigned">
          <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
            <Tabs.Trigger
              className={tabs}
              value="not_assigned"
              onClick={() => setTabsValue('NOT_ASSIGNED')}
            >
              ASA Not Assigned
            </Tabs.Trigger>
            <Tabs.Trigger
              className={tabs}
              value="freezed"
              onClick={() => setTabsValue('FREEZED')}
            >
              Freezed ASA
            </Tabs.Trigger>
            <Tabs.Trigger
              className={tabs}
              value="unfreezed"
              onClick={() => setTabsValue('UNFREEZED')}
            >
              Unfreezed ASA
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className={tabsContent}
            value="not_assigned"
          >
            <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />
          </Tabs.Content>
          <Tabs.Content className={tabsContent}
           value="freezed">
            <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />
          </Tabs.Content>
          <Tabs.Content
            className={tabsContent}
            value="unfreezed"
          >
            <BeneficiaryTab
              handleSelectAll={handleSelectAll}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              selectedBeneficiaries={selectedBeneficiaries}
              data={data}
            />
          </Tabs.Content>
          <div className="pt-20 pr-24">{data?.total === 0 && <NoBeneficiary />}</div>
        </Tabs.Root>
        <Hookpagination total={total} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage} setLimit={setLimit} />
      </div>
    </div>
  );
  
}
