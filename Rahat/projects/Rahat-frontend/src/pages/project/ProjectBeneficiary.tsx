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

type Beneficiary = {
  uuid: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  walletAddress: string;
};

export default function ProjectBeneficiary() {
  const { id } = useParams();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const { data } = useList('listProjectBeneficiary', `${URLS.PROJECT}/${id}/beneficiaries`, 1, 1);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

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
    console.log(selectedBeneficiaries);
    const signedTxn = await atomicTxnComposer(activeAddress as string, selectedBeneficiaries, 1, asaId, sender)
    await algodClient.sendRawTransaction(signedTxn).do()
  };

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setBeneficiaries(data.data);
    }
  }, [data]);


  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 flow-root w-screen">

      <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 flex gap-2 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              className="block rounded-md bg-indigo-600  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              to={`/admin/project/${id}/add-beneficiary`}
            >
              Add beneficiaries
            </Link>

            {selectedBeneficiaries.length > 0 && (
              <button
                onClick={() => submitTransferToken()}
                type="button"
                className="block rounded-md bg-indigo-600  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Transfer Token
              </button>
            )}
            
          </div>
        </div>

      <Tabs.Root
    className="flex flex-col w-[full] mt-8"
    defaultValue="not_assigned"
  >
    <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-2 border-b-indigo-800 data-[state=active]:shadow-current data-[state=active]:focus:relative  outline-none cursor-default"
        value="not_assigned"
      >
        ASA Not Assigned
      </Tabs.Trigger>
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-2 border-b-indigo-800 data-[state=active]:shadow-current data-[state=active]:focus:relative  outline-none cursor-default"
        value="freezed"
      >
        Freezed ASA
      </Tabs.Trigger>
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-2 border-b-indigo-800 data-[state=active]:shadow-current data-[state=active]:focus:relative  outline-none cursor-default"
        value="unfreezed"
      >
        Unfreezed ASA
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="not_assigned"
    >
      <BeneficiaryNotAssigned 
        handleSelectAll={handleSelectAll} 
        setSelectedBeneficiaries={setSelectedBeneficiaries} 
        selectedBeneficiaries={selectedBeneficiaries}
      />

    </Tabs.Content>
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="freezed"
    >
      <BeneficiaryNotAssigned 
        handleSelectAll={handleSelectAll} 
        setSelectedBeneficiaries={setSelectedBeneficiaries} 
        selectedBeneficiaries={selectedBeneficiaries}
      />
    </Tabs.Content>

    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="unfreezed"
    >
      <BeneficiaryNotAssigned 
        handleSelectAll={handleSelectAll} 
        setSelectedBeneficiaries={setSelectedBeneficiaries} 
        selectedBeneficiaries={selectedBeneficiaries}
      />
    </Tabs.Content>
  </Tabs.Root>
        
        
        
        
      </div>
    </div>
  );
}
