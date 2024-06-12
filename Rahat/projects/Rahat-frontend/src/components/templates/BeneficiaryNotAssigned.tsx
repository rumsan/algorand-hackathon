import { Link, useParams } from 'react-router-dom';
import useList from '../../hooks/useList';
import { URLS } from '../../constants';
import { useEffect, useState } from 'react';

// @ts-ignore
import Jdenticon from 'react-jdenticon';
import TruncatedCell from '@/components/TruncatedCell';
import { algodClient } from '@/utils/typedClient';
import { atomicTxnComposer } from '@/utils/atc';
import { asaId } from '@/utils/asaId';
import { useWallet } from '@txnlab/use-wallet';
import * as snack from "../../components/Toaster";

type Beneficiary = {
    uuid: string;
    email: string;
    name: string;
    age: number;
    gender: string;
    walletAddress: string;
  };

const BeneficiaryTab = ({handleSelectAll, setSelectedBeneficiaries, selectedBeneficiaries, data}: any) => {
  const { id ,beneficiaryId} = useParams();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

  const handleCheckboxChange = (walletAddress: string) => {
    setSelectedBeneficiaries((prevSelected: any) =>
      prevSelected.includes(walletAddress) ? prevSelected.filter((e: any) => e !== walletAddress) : [...prevSelected, walletAddress]
    );
  };

  const submitTransferToken = async () => {
    const signedTxn = await atomicTxnComposer(activeAddress as string, selectedBeneficiaries, 1, Number(localStorage.getItem('voucherId')), sender)
    await algodClient.sendRawTransaction(signedTxn).do()
    snack.default.success("Adding project to contract")
  };

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setBeneficiaries(data.data);
    }
  }, [data]);
  
  return (
    <div className="w-full">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            {data?.data.length > 0 && (

            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  WalletAddress
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Gender
                </th>
              </tr>
            </thead>
            )}

            <tbody className="divide-y divide-gray-200 bg-white">
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.walletAddress}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(beneficiary.walletAddress)}
                      checked={selectedBeneficiaries.includes(beneficiary.walletAddress)}
                    />
                  </td>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <Jdenticon size="48" value={beneficiary.name} />
                      </div>
                      <div className="ml-4">
                        <Link to={`/admin/project/${id}/beneficiary/${beneficiary.uuid}`} className="font-medium text-gray-900">
                          {beneficiary.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <Link to={`/admin/project/${id}/beneficiary/${beneficiary.uuid}`} className="text-gray-900">
                      {beneficiary.email}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <Link to={`/admin/project/${id}/beneficiary/${beneficiary.uuid}`} className="text-gray-500">
                      <TruncatedCell text={beneficiary.walletAddress} />
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <Link to={`/admin/project/${id}/beneficiary/${beneficiary.uuid}`} className="text-gray-500">
                      {beneficiary.gender}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BeneficiaryTab
