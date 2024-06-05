import { Link, useParams } from 'react-router-dom';
import useList from '../../hooks/useList';
import { URLS } from '../../constants';
import { useEffect, useState } from 'react';

// @ts-ignore
import Jdenticon from 'react-jdenticon';
import TruncatedCell from '@/components/TruncatedCell';
import SideBar from '@/components/SideBar';

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
  const { data } = useList('listProjectBeneficiary', `${URLS.PROJECT}/${id}/beneficiaries`, 1, 5);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);

  const handleCheckboxChange = (walletAddress: string) => {
    setSelectedBeneficiaries((prevSelected) =>
      prevSelected.includes(walletAddress) ? prevSelected.filter((e) => e !== walletAddress) : [...prevSelected, walletAddress]
    );
  };

  const handleSelectAll = () => {
    const allWalletAddresses = beneficiaries.map((person) => person.walletAddress);
    setSelectedBeneficiaries((prevSelected) => (prevSelected.length === allWalletAddresses.length ? [] : allWalletAddresses));
  };

  const submitTransferToken = () => {
    console.log(selectedBeneficiaries);
    // Add logic for transferring tokens
  };

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setBeneficiaries(data.data);
    }
  }, [data]);

  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 mt- flow-root w-screen">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 flex gap-2 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              className="block rounded-md bg-indigo-200  px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              to={`/admin/project/${id}/add-beneficiary`}
            >
              Add beneficiaries
            </Link>
            {selectedBeneficiaries.length > 0 && (
              <button
                onClick={() => setSelectedBeneficiaries([])}
                type="button"
                className="block rounded-md bg-indigo-200  px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Transfer Token
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
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
                        <Link to={`/admin/beneficiary/${beneficiary.uuid}`} className="text-gray-900">
                          {beneficiary.email}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <Link to={`/admin/beneficiary/${beneficiary.uuid}`} className="text-gray-500">
                          <TruncatedCell text={beneficiary.walletAddress} />
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <Link to={`/admin/beneficiary/${beneficiary.uuid}`} className="text-gray-500">
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
      </div>
    </div>
  );
}
