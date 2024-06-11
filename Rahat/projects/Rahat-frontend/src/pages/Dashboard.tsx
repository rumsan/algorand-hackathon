import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { ArrowDownCircleIcon, ArrowPathIcon, ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import useList from "@/hooks/useList";
import { URLS } from "@/constants";
import React, { useEffect, useRef } from "react";
import DashboardAge from "@/components/chart/DashboardAge";
import DashboardGender from "@/components/chart/DashboardGender";
import BeneficiaryStatusChart from "@/components/chart/BeneficiaryStatusChart";
import { useAlgorandContractTransactions } from "@/hooks/useAlgorandInfo";
const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

type project = {
  uuid: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  voucherId: number;
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashBoard() {
  let { isLoading, isError, data } = useList("listCount", `${URLS.BENEFICIARY}/get-count`, 1, 6);
  const { transactions, loading, error } = useAlgorandContractTransactions(677911287);
  const [projects, setProjects] = useState<project[]>([]);

  useEffect(() => {});

  let { data: projectData } = useList("listProject", URLS.PROJECT, 1, 3);
  function formatValue(value: any) {
    if (value === undefined || value === null) return value;

    return value < 10 ? `0${value}` : value;
  }

  useEffect(() => {
    if (projectData) {
      setProjects(projectData?.data);
    }
  }, [projectData, data]);
  const stats = [
    { name: " Projects", value: formatValue(data?.totalProject), change: "active", changeType: "positive" },
    { name: " Beneficiaries", value: formatValue(data?.totalBeneficiary), change: "+54.02%", changeType: "positive" },
    { name: "Tokens Assigned", value: formatValue(data?.voucherCount), change: "-1.39%", changeType: "positive" },
    { name: "Unique Vendors", value: formatValue(data?.vendorCount), change: "+10.18%", changeType: "negative" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* start */}

      <main>
        <div className="relative isolate overflow-hidden">
          <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
              {stats.map((stat, statIdx) => (
                <div
                  key={stat.name}
                  className={classNames(
                    statIdx % 2 === 1 ? "sm:border-l" : statIdx === 2 ? "lg:border-l" : "",
                    "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                  )}
                >
                  <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                  <dd
                    className={classNames(stat.changeType === "negative" ? "text-rose-600" : "text-gray-700", "text-xs font-medium")}
                  ></dd>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
            {data?.totalBeneficiary > 0 && (
              <div className="flex items-center justify-center space-x-40 pt-20 pb-5">
                <div>
                  <h1 className="text-blue-900 font-bold pl-32 pb-5">Gender Graph</h1>
                  <DashboardGender />
                </div>
                <div>
                  <h1 className="text-blue-900 font-bold pl-32 pb-5">Age Graph</h1>

                  <DashboardAge />
                </div>
                <div>
                  <h1 className="text-blue-900 font-bold pl-32 pb-5">Beneficiary Status Chart</h1>
                  <BeneficiaryStatusChart />
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
            aria-hidden="true"
          >
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
            />
          </div>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((day) => (
                        <Fragment key={day.dateTime}>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                              <time dateTime={day.dateTime}>{day.date}</time>
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          {day.transactions.map((transaction: any) => (
                            <tr key={transaction.id}>
                              <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                  <transaction.icon className="hidden h-6 w-5 flex-none text-gray-400 sm:block" aria-hidden="true" />
                                  <div className="flex-auto">
                                    <div className="flex items-start gap-x-3">
                                      <div className="text-sm font-medium leading-6 text-gray-900">{transaction.amount}</div>
                                      <div
                                        className={classNames(
                                          statuses[transaction.status],
                                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        {transaction.status}
                                      </div>
                                    </div>
                                    {transaction.tax ? (
                                      <div className="mt-1 text-xs leading-5 text-gray-500">Txn Fee: {transaction.tax}</div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden py-5 pr-6 sm:table-cell">
                                <div className="text-sm leading-6 text-gray-900">{transaction.client}</div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.description}</div>
                              </td>
                              <td className="py-5 text-right">
                                <div className="flex justify-end">
                                  <a
                                    href={`https://app.dappflow.org/explorer/transaction/${transaction?.invoiceNumber}`}
                                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    View<span className="hidden sm:inline"> transaction</span>
                                    <span className="sr-only">
                                      {transaction.invoiceNumber}, {transaction.client}
                                    </span>
                                  </a>
                                </div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  <span className="text-gray-900">#{transaction.invoiceNumber}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none"></div> */}

          {projects?.length ? (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-7 text-blue-900">Recent projects</h2>
              </div>{" "}
              <div className="sm:flex sm:items-center mb-3">
                <div className="sm:flex-auto"></div>
              </div>
              <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {projects.map((project) => (
                  <li key={project.uuid} className="overflow-hidden rounded-xl border border-gray-200">
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                      />
                      <div className="text-sm font-medium leading-6 text-gray-900">{project.name}</div>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Created Date</dt>
                        <dd className="text-gray-700">
                          <time dateTime={project.createdAt}>{project.createdAt}</time>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Asset Id</dt>
                        <dd className="flex items-start gap-x-2">
                          <div className="font-medium text-gray-900">{project.voucherId}</div>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </>
  );
}
