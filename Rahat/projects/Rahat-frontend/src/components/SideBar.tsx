// import { URLS } from "@/constants";
// import useGet from "../hooks/useGet";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import projectIcon from "../assets/projectDetail.png"; // Import the image correctly
// import transaction from "../assets/transaction.png";
// import vendor from "../assets/vendor.png";
// import beneficiary from "../assets/beneficiary.png";

// function SideBar() {
//   const param = useParams();

//   const [project, setProject] = useState<any>(null);
//   const [showVendorDetail, setShowVendorDetail] = useState(false);

//   const { data } = useGet(`getById${param.id}`, URLS.PROJECT, param.id as string);

//   useEffect(() => {
//     if (data) {
//       setProject(data);

//       if (data.vendorId !== null) {
//         setShowVendorDetail(true);
//       }
//     }
//   }, [data]);

//   const p = localStorage.getItem("project");
//   let pid = p ? JSON.parse(p).uuid : null;

// const navigation = [
//   {
//     name: "Project Details",
//     href: `/admin/project/${pid}`,
//     image: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
//         />
//       </svg>
//     ),

//     current: false,
//   },
//   {
//     name: "Beneficiaries",
//     href: `/admin/project/${param.id}/beneficiary`,
//     image: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//         />
//       </svg>
//     ),
//     current: false,
//   },
//   {
//     name: "Transactions",
//     href: `/admin/project/${param.id}/transactions`,
//     image: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
//         />
//       </svg>
//     ),
//     current: false,
//   },
// ];

//   return (
//     <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4 mt-16">
//       <nav className="mt-20">
//         <br />
//         <ul className="space-y-9">
//           {navigation.map((item) => (
//             <li key={item.name} className="flex items-center">
//               {" "}
//               {/* Add flex class for horizontal alignment */}
//               {/* <img src={item.image} alt="" className=" w-9 mr-2" /> */}
//               <div>{item.image}</div>
//               <Link to={item.href} className="block p-2 text-lg font-medium text-blue-900 hover:bg-gray-200 rounded-md">
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// export default SideBar;

import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { URLS } from "@/constants";
import useGet from "@/hooks/useGet";
import { useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const param = useParams();

  const [project, setProject] = useState<any>(null);
  const [showVendorDetail, setShowVendorDetail] = useState(false);

  const { data } = useGet(`getById${param.id}`, URLS.PROJECT, param.id as string);

  useEffect(() => {
    if (data) {
      setProject(data);

      if (data.vendorId !== null) {
        setShowVendorDetail(true);
      }
    }
  }, [data]);

  const p = localStorage.getItem("project");
  let pid = p ? JSON.parse(p).uuid : null;

  const navigationOne = [
    { name: "Projects", href: `/admin/project/${pid}`, icon: FolderIcon, current: false },
    { name: "Beneficiaries", href: `/admin/project/${param.id}/beneficiary`, icon: UsersIcon, current: false },
  ];
  const navigationTwo = [
    { name: "Transaction", href: `/admin/project/${param.id}/transactions`, icon: BanknotesIcon, current: false },
    { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-12 w-auto"
                        src="https://rahat-rumsan.s3.amazonaws.com/website-images/lecksw9nyac3hp5pye.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigationOne.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current ? "bg-gray-50 text-indigo-600" : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4 ">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto  bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-16 w-auto m-2"
                src="https://rahat-rumsan.s3.amazonaws.com/website-images/lecksw9nyac3hp5pye.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col pt-8">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Project Management</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigationOne.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current ? "bg-gray-50 text-indigo-600" : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Transaction Overview</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigationTwo.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current ? "bg-gray-50 text-indigo-600" : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
