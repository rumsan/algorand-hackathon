import { Link } from 'react-router-dom';
import useList from '../hooks/useList';
import { URLS } from '../constants';
import { useEffect, useState } from 'react';
// @ts-ignore
import Jdenticon from 'react-jdenticon';

type Beneficiary = {
  email: string;
  name: string;
  age: number;
  gender: string;
  walletAddress: string;
  mnemonics: string;
};
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    gender: 'Female',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'James Smith',
    title: 'Back-end Developer',
    department: 'Infrastructure',
    email: 'james.smith@example.com',
    gender: 'Male',
    walletAddress: '0x2b3c4d5e6f7g8h9i0j1k',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Johnson',
    title: 'UX Designer',
    department: 'Design',
    email: 'emily.johnson@example.com',
    gender: 'Female',
    walletAddress: '0x3c4d5e6f7g8h9i0j1k2l',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Williams',
    title: 'Project Manager',
    department: 'Management',
    email: 'michael.williams@example.com',
    gender: 'Male',
    walletAddress: '0x4d5e6f7g8h9i0j1k2l3m',
    image:
      'https://images.unsplash.com/photo-1502767089025-6572583495c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Sophia Brown',
    title: 'Data Scientist',
    department: 'Analytics',
    email: 'sophia.brown@example.com',
    gender: 'Female',
    walletAddress: '0x5e6f7g8h9i0j1k2l3m4n',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Daniel Davis',
    title: 'DevOps Engineer',
    department: 'Operations',
    email: 'daniel.davis@example.com',
    gender: 'Male',
    walletAddress: '0x6f7g8h9i0j1k2l3m4n5o',
    image:
      'https://images.unsplash.com/photo-1506898668820-6fffa7b20a5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Olivia Martinez',
    title: 'Product Manager',
    department: 'Product',
    email: 'olivia.martinez@example.com',
    gender: 'Female',
    walletAddress: '0x7g8h9i0j1k2l3m4n5o6p',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ethan Wilson',
    title: 'Marketing Specialist',
    department: 'Marketing',
    email: 'ethan.wilson@example.com',
    gender: 'Male',
    walletAddress: '0x8h9i0j1k2l3m4n5o6p7q',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Isabella Garcia',
    title: 'Sales Manager',
    department: 'Sales',
    email: 'isabella.garcia@example.com',
    gender: 'Female',
    walletAddress: '0x9i0j1k2l3m4n5o6p7q8r',
    image:
      'https://images.unsplash.com/photo-1502764613149-7f1d229e2306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Jacob Anderson',
    title: 'Content Writer',
    department: 'Content',
    email: 'jacob.anderson@example.com',
    gender: 'Male',
    walletAddress: '0x0j1k2l3m4n5o6p7q8r9s',
    image:
      'https://images.unsplash.com/photo-1502767089025-6572583495c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function Beneficiaries() {
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  console.log(selectedBeneficiaries);
  const handleCheckboxChange = (walletAddress: string) => {
    // If beneficiary is already selected, deselect it
    if (selectedBeneficiaries.includes(walletAddress)) {
      setSelectedBeneficiaries(selectedBeneficiaries.filter((e) => e !== walletAddress));
    } else {
      // Otherwise, add it to selected beneficiaries
      setSelectedBeneficiaries([...selectedBeneficiaries, walletAddress]);
    }
  };

  const handleSelectAll = () => {
    const allEmails = people.map((person) => person.walletAddress);
    // If all are selected, deselect all; otherwise, select all
    if (selectedBeneficiaries.length === allEmails.length) {
      setSelectedBeneficiaries([]);
    } else {
      setSelectedBeneficiaries(allEmails);
    }
  };
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  let { isLoading, isError, data } = useList('listBlog', URLS.BENEFICIARY, 1, 5);
  const submitTransferToken = () => {
    console.log(selectedBeneficiaries);
  };
  useEffect(() => {
    if (data) {
      setBeneficiaries(data.data);
    }
  }, [data, setBeneficiaries]);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 flex gap-2 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Link to={'/admin/add-beneficiary'}> Add beneficiaries</Link>
          </button>
          <button
            onClick={submitTransferToken}
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Transfer Token
          </button>
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
                    Age
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Gender
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    WalletAddress
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((beneficiary) => (
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
                          <div className="font-medium text-gray-900">{beneficiary.name}</div>
                          <div className="mt-1 text-gray-500">{beneficiary.email}</div>
                        </div>
                      </div>
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{beneficiary.age}</td> */}
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{beneficiary.gender}</div>
                      <div className="mt-1 text-gray-500">{beneficiary.walletAddress}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{beneficiary.gender}</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {beneficiary.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
