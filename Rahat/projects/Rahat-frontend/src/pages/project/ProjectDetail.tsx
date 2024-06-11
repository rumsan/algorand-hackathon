import SideBar from "@/components/SideBar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGet from "@/hooks/useGet";
import { URLS } from "@/constants";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useWallet } from "@txnlab/use-wallet";

import { EllipsisVerticalIcon, UsersIcon } from "lucide-react";

import ProjectAge from "@/components/chart/ProjectAge";
import ProjectGender from "@/components/chart/ProjectGender";
import TruncatedCell from "@/components/TruncatedCell";

import { UserGroupIcon, ClockIcon } from "@heroicons/react/24/outline";
import { asaId } from "@/utils/asaId";

import Jdenticon from "react-jdenticon";
import { assetHoldinig } from "@/utils/sdkCall/assetHolding";
import { algodClient } from "@/utils/typedClient";

export const navigation = [
  {
    name: "Projects",
    href: "/admin/project/",
    current: false,
  },
  {
    name: "Beneficiaries",
    href: "/admin/project/beneficiary",
  },
  {
    name: "Transactions",
    href: "/admin/transactions",
    current: false,
  },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function Example() {
  const { activeAddress } = useWallet();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [showVendorDetail, setShowVendorDetail] = useState(false);

  const { data } = useGet(`getById${id}`, URLS.PROJECT, id as string);

  const [projectASA, setProjectASA] = useState(0);

  const vid = project?.voucherId;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "short",
  };

  let { data: voucher } = useGet(`getVoucher${id}`, URLS.VOUCHER, vid as string);
  voucher ? localStorage.setItem("voucher", JSON.stringify(voucher)) : null;

  useEffect(() => {
    if (data) {
      setProject(data);
      localStorage.setItem("voucherId", JSON.stringify(data.voucherId));
      if (data.vendorId !== null) {
        setShowVendorDetail(true);
      }
    }
  }, [data]);

  if (project) {
    localStorage.setItem("project", JSON.stringify(project));
  }

  const activityItems = [
    {
      user: {
        name: <TruncatedCell text={project?.superAdmin ?? ""} />,
        imageUrl: <Jdenticon size="48" value="Subhashish" />,
      },
      projectName: project?.name,
      commit: "2d89f0c8",
      branch: "main",
      date: "1h",
      dateTime: "2023-01-23T11:00",
    },
  ];

  const date = new Date(project?.createdAt);

  const stats = [
    {
      id: 1,
      name: "Total Beneficiaries",
      stat: project?.beneficiaries?.length ?? 0,
      icon: UserGroupIcon,
    },
    {
      id: 2,
      name: "Initiated By",
      stat: <TruncatedCell text={project?.superAdmin ?? ""} />,
      icon: UsersIcon,
    },
    { id: 3, name: "Created At", stat: date.toLocaleString("en-US", options), icon: ClockIcon },
  ];

  const statsOne = [
    {
      name: "Asset Name",
      stat: voucher?.voucherName ? voucher.voucherName : "...",
    },
    {
      name: "Asset Symbol",
      stat: voucher?.voucherSymbol ? voucher.voucherSymbol : "...",
      previousStat: "1000 USDT",
      change: "12%",
      changeType: "increase",
    },
    { name: "Asset Id", stat: asaId, previousStat: "28.62%" },
    { name: "Asset Assigned", stat: projectASA.toLocaleString() },
    { name: "Asset Redeemed ", stat: "58", changeType: "increase" },
  ];
  const statsTwo = [
    { name: "Asset Assigned", stat: "71,897" },
    { name: "Asset Redem ", stat: "58" },
    // { name: "Avg. Click Rate", stat: "24.57%" },
  ];

  useEffect(() => {
    getProjectDetail();
  }, [])
  const getProjectDetail = async () => {
    const address = await algodClient.getAssetByID(asaId).do()
    const assetHoldingOfProject = await assetHoldinig(address.params.clawback)
    const totalAssetMinted = await address.params.total

    const totalAssetAssigned = totalAssetMinted - assetHoldingOfProject.amount;

    setProjectASA(totalAssetAssigned)
  }

  return (
    <>
      <div className="flex">
        <SideBar />

        <div className="ml-64 w-full">
          <header className="relative isolate pt-16">
            <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80"></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                <div className="flex items-center gap-x-11">
                  <img src={project?.imageUrl} alt="" className="h-24 w-24 flex-none rounded-full ring-1 ring-gray-900/10" />
                  <h1>
                    <div className=" text-sm leading-6 text-gray-700">
                      Project ID <span className="text-gray-500">{project?.uuid}</span>
                    </div>
                    <div className=" text-2xl mt-1  font-semibold leading-6 text-blue-900">{project?.name}</div>
                    <div className="text-sm leading-6 text-gray-500">
                      <span className="bg-green-100 text-green-800 p-1">{project?.status ? project?.status : "Active"}</span>
                    </div>{" "}
                  </h1>
                </div>
                <div>
                  {project?.superAdmin === activeAddress && (
                    <Menu as="div" className="relative ml-auto">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-900 hover:text-gray-500">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            <Link className="block px-3 py-1 text-sm leading-6 text-gray-900" to={`/admin/project/${id}/addAdmin`}>
                              Add admin
                            </Link>
                          </Menu.Item>
                          {!showVendorDetail && (
                            <Menu.Item>
                              <Link className="block px-3 py-1 text-sm leading-6 text-gray-900" to={`/admin/project/${id}/create-vendor`}>
                                Add Vendor
                              </Link>
                            </Menu.Item>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-16 sm:px-6 lg:px-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Project Details</h3>
            <div>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.id} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <div className="absolute rounded-md bg-blue-500 p-3">
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-1xl text-gray-900">{item?.stat}</p>

                      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            View all<span className="sr-only"> {item.name} stats</span>
                          </a>
                        </div>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900 mt-12">Asset Details</h3>
              <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                {statsOne.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-blue-600">
                        {item.stat}

                        {item.change && <span className="ml-2 text-sm font-medium text-gray-500">worth {item.previousStat}</span>}
                      </div>

                      <div
                        className={classNames(
                          item.changeType === "increase" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                          "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                        )}
                      ></div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex items-center justify-around mt-10 border p-4">
              <ul role="list" className="divide-y divide-gray-100">
                <h3 className="text-base font-semibold leading-6 mb-2 text-gray-700">Super Admin Wallet Address</h3>
                {activityItems.map((item) => (
                  <li key={item.commit} className="py-4">
                    <div className="flex items-center gap-x-3">
                      {item.user.imageUrl}
                      <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">{item.user.name}</h3>
                      <time dateTime={item.dateTime} className="flex-none text-xs text-gray-500">
                        {item.date}
                      </time>
                    </div>
                    <p className="mt-3 truncate text-sm text-gray-500">
                      created <span className="text-gray-700">{item.projectName}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <ul role="list" className="divide-y divide-gray-100">
                <h3 className="text-base font-semibold leading-6 mb-2 text-gray-700">Admin Wallets</h3>
                {activityItems.map((item) => (
                  <li key={item.commit} className="py-4">
                    <div className="flex items-center gap-x-3">
                      {item.user.imageUrl}
                      <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">{item.user.name}</h3>
                      <time dateTime={item.dateTime} className="flex-none text-xs text-gray-500">
                        {item.date}
                      </time>
                    </div>
                    <p className="mt-3 truncate text-sm text-gray-500">
                      registered to <span className="text-gray-700">{item.projectName}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <ul role="list" className="divide-y divide-gray-100">
                <h3 className="text-base font-semibold leading-6 mb-2 text-gray-700">Vendor Wallets</h3>
                {activityItems.map((item) => (
                  <li key={item.commit} className="py-4">
                    <div className="flex items-center gap-x-3">
                      {item.user.imageUrl}
                      <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">{item.user.name}</h3>
                      <time dateTime={item.dateTime} className="flex-none text-xs text-gray-500">
                        {item.date}
                      </time>
                    </div>
                    <p className="mt-3 truncate text-sm text-gray-500">
                      registered to <span className="text-gray-700">{item.projectName}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {project?.beneficiaries?.length > 0 && (
              <div className="flex items-center justify-center space-x-40 pt-20">
                <div>
                  <h1 className="text-blue-900 font-bold pl-32 pb-5">Gender Graph</h1>
                  <ProjectGender />
                </div>
                <div>
                  <h1 className="text-blue-900 font-bold pl-32 pb-5">Age Graph</h1>
                  <ProjectAge />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
