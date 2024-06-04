import SideBar from '@/components/SideBar';
import { Link, useParams } from 'react-router-dom';
import BeneficiaryDetailClawback from '../BeneficiaryDetailClawback';
import { useEffect, useState } from 'react';
import useGet from '@/hooks/useGet';
import { URLS } from '@/constants';



const transaction = [
  {
    id: 1,
    beneficiaryId: 'B12345',
    from: '0xabcdef1234567890abcdef1234567890abcdef00',
    to: '0x1234567890abcdef1234567890abcdef12345600',
    timestamp: '2024-05-24T10:30:00Z',
    txnHash: '0x123abc',
    amount: '100.00',
    txnFee: '1.00',
  },
  {
    id: 8,
    beneficiaryId: 'B12345',
    from: '0xabcdef1234567890abcdef1234567890abcdef00',
    to: '0x1234567890abcdef1234567890abcdef12345600',
    timestamp: '2024-05-24T10:30:00Z',
    txnHash: '0x123abc',
    amount: '100.00',
    txnFee: '1.00',
  },
  {
    id: 2,
    beneficiaryId: 'B12345',
    from: '0xabcdef1234567890abcdef1234567890abcdef00',
    to: '0x1234567890abcdef1234567890abcdef12345600',
    timestamp: '2024-05-24T10:30:00Z',
    txnHash: '0x123abc',
    amount: '100.00',
    txnFee: '1.00',
  },
  {
    id: 3,
    beneficiaryId: 'B12345',
    from: '0xabcdef1234567890abcdef1234567890abcdef00',
    to: '0x1234567890abcdef1234567890abcdef12345600',
    timestamp: '2024-05-24T10:30:00Z',
    txnHash: '0x123abc',
    amount: '100.00',
    txnFee: '1.00',
  },
  {
    id: 4,
    beneficiaryId: 'B12345',
    from: '0xabcdef1234567890abcdef1234567890abcdef00',
    to: '0x1234567890abcdef1234567890abcdef12345600',
    timestamp: '2024-05-24T10:30:00Z',
    txnHash: '0x123abc',
    amount: '100.00',
    txnFee: '1.00',
  },
];

export default function BeneficiaryDetail() {
  const { id } = useParams();
  const [beneficiaries, setBeneficiaries] = useState<any>(null);

  const { data } = useGet(`getById${id}`, URLS.BENEFICIARY, id as string);

  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      setBeneficiaries(data);
    }
  }, [data]);

  if (!beneficiaries) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="ml-64 w-full">
          <header className="relative isolate pt-16">
            <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                <div
                  className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                  style={{
                    clipPath:
                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                <div className="flex items-center gap-x-6">
                  <img
                    src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                    alt=""
                    className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                  />
                  <h1>
                    <div className="text-sm leading-6 text-gray-500">
                      Beneficiary id <span className="text-gray-700">{beneficiaries.uuid}</span>
                    </div>
                    <div className="text-2xl mt-1 font-semibold leading-6 text-gray-900">{beneficiaries.name}</div>
                    <div className="text-sm leading-6 text-gray-500">
                      status <span className="text-gray-700">{beneficiaries.gender}</span>
                    </div>
                  </h1>
                </div>
              </div>
            </div>
                  <BeneficiaryDetailClawback />
          </header>

          <main className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-between gap-x-8">
              {/* Project Details */}
              <div className="w-1/2 mx-auto px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900 mb-6">Project Enrollment</h2>
                <table className="w-full text-sm leading-8">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Project ID</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Project Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //@ts-ignore
                      beneficiaries.projects?.map((project) => (
                        <tr key={project.uuid}>
                          <td className="px-6 py-3 text-left">{project.uuid}</td>
                          <td className="px-6 py-3 text-left">
                            <Link to={`/admin/project/${project.uuid}`} className="text-blue-500 hover:underline">
                              {project.name}
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

              {/* Budget Details */}
              <div className="w-1/2 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900">Transaction details</h2>
                <br />
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Timestamp
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        TxnHash
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        TxnFee
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transaction.map((transac) => (
                      <tr key={transac.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transac.timestamp}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transac.txnHash}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${transac.amount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${transac.txnFee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
