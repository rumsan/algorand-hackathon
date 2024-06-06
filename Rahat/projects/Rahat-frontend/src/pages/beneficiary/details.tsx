import { PeraWalletConnect } from '@perawallet/connect';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useGet from '@/hooks/useGet';
import { URLS } from '@/constants';
import { transaction } from '../project/BeneficiaryDetail';

const BeneficiaryDetails = () => {
  const peraWallet = new PeraWalletConnect({ chainId: 416002 });

  const connectWallet = async () => {
    await peraWallet.connect();
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const { id } = useParams();
  const [beneficiary, setBeneficiary] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [vouchers, setVouchers] = useState<any>({});

  const { data } = useGet(`getById${id}`, `${URLS.BENEFICIARY}/find-by-wallet`, id);

  useEffect(() => {
    if (data) {
      setBeneficiary(data);
      setProjects(data?.projects);
    }
    localStorage.setItem('projects', JSON.stringify(data?.projects));

    // const storedVoucher = localStorage.getItem('voucher');
    // if (storedVoucher) {
    //   setVoucher(JSON.parse(storedVoucher));
    // }
  }, [data]);
  console.log(projects);

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        {/* <SideBar /> */}

        {/* Main Content */}
        <div className="ml-64 w-full ">
          <header className="relative isolate pt-10 ">
            <div className="absolute  inset-0 -z-10 overflow-hidden" aria-hidden="true">
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
                <div className="flex items-center gap-x-6 ">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmYB6XE3DV1YfFD3Y41ej68S8pg2lbxMecA&usqp=CAU"
                    alt=""
                    className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                  />
                  <h1>
                    <div className="text-sm leading-6 text-gray-500 py-1">
                      Beneficiary id <span className="text-gray-700">{beneficiary?.uuid}</span>
                    </div>
                    <div className="py-1 text-2xl mt-1 font-semibold leading-6 text-gray-900">{beneficiary?.name}</div>
                    <div className="py-1 text-sm leading-6 text-gray-500">
                      <span className="text-gray-700">{beneficiary?.walletAddress}</span>
                    </div>
                    <div className="py-1 text-sm leading-6 text-gray-500">
                      <span className="text-gray-700">{beneficiary?.email}</span>
                    </div>
                  </h1>
                </div>

                <Link className="p-2 font-medium text-white bg-red-600 rounded-sm" to={`/beneficiary/utilize-asa/${id}`}>
                  Utilize ASA
                </Link>
              </div>
            </div>
          </header>

          <main className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-between gap-x-8">
              {/* Project Details */}
              <div className="w-1/2 mx-auto px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-2xl font-semibold leading-6 text-blue-900 mb-6">Project Enrollment</h2>
                <table className="w-full text-sm leading-8">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Project Name</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Asset Name</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">ASA Assigned</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">ASA Utilized</th>
                    </tr>
                  </thead>
                  {projects.map((project: any) => (
                    <tbody key={project.id}>
                      <tr>
                        <td className="px-6 py-3 text-left">{project?.name}</td>
                        <td className="px-6 py-3 text-left">
                          {project?.voucher?.voucherName ? project?.voucher?.voucherName : 'No Asset'}
                        </td>
                        <td className="px-6 py-3 text-left">100</td>
                        <td className="px-6 py-3 text-left">10</td>
                      </tr>
                    </tbody>
                  ))}

                  <tbody>
                    <tr></tr>
                  </tbody>
                </table>
              </div>

              {/* Budget Details */}
              <div className="w-1/2 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-2xl font-semibold leading-6 text-blue-900">Transaction details</h2>
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
                    {transaction.map((transac: any) => (
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
};

export default BeneficiaryDetails;
