// import { Fragment, useState } from "react";
// import { Dialog, Menu, Transition } from "@headlessui/react";
// import { useWallet } from "@txnlab/use-wallet";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Bars3Icon, BellIcon, Cog6ToothIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon, BanknotesIcon } from "@heroicons/react/24/outline";
// import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import { Link, Outlet } from "react-router-dom";
// import { PhoneCall } from "lucide-react";
// import TruncatedCell from "@/components/TruncatedCell";

// const navigation = [
//   { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon, current: false },
//   { name: "Projects", href: "/admin/project", icon: FolderIcon, current: false },
//   {
//     name: "Beneficiaries",
//     href: "/admin/beneficiary",
//     icon: UsersIcon,
//     current: false,
//   },
// ];

// const userNavigation = [{ name: "Your profile", href: "#" }];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }
// const NavBar = () => {
//   const [openWalletModal, setOpenWalletModal] = useState(false);

//   const { providers, activeAddress } = useWallet();

//   const handleWalletLogout = async () => {
//     if (providers) {
//       const activeProvider = providers.find((p) => p.isActive);
//       if (activeProvider) {
//         await activeProvider.disconnect();
//       }
//     }
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <div>
//         <div className="lg:fixed lg:top-0 lg:w-full lg:z-50">
//           <div className="flex h-20 items-center bg-gray-900 px-20">
//             <div className="flex items-center">
//               <img
//                 className="h-16 pr-5 w-auto"
//                 src="https://assets.rumsan.net/rumsan-group/footer-esatya-rahat-logo.png"
//                 alt="Your Company"
//               />
//             </div>
//             <nav className="flex-1">
//               <ul role="list" className="flex gap-x-6">
//                 {navigation.map((item) => (
//                   <li key={item.name}>
//                     <Link
//                       to={item.href}
//                       className={classNames(
//                         item.current ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
//                         "group flex items-center gap-x-3 rounded-md px-4 py-2 text-sm leading-6 font-semibold"
//                       )}
//                     >
//                       {/* <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//             <div className="flex items-center ml-auto">
//               <Menu as="div" className="relative">
//                 <Menu.Button className="-m-1.5 flex items-center p-1.5">
//                   <span className="sr-only">Open user menu</span>
//                   {/* //@ts-ignore */}
// <p className="text-white">{<TruncatedCell text={activeAddress?.toString() ?? ""} />}</p>
// <img
//   className="h-8 w-8 rounded-full bg-gray-50"
//   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmYB6XE3DV1YfFD3Y41ej68S8pg2lbxMecA&usqp=CAU"
//   alt=""
// />
//                   <span className="hidden lg:flex lg:items-center">
//                     <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
//                   </span>
//                 </Menu.Button>
//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
//                     {userNavigation.map((item) => (
//                       <Menu.Item key={item.name}>
//                         {({ active }) => (
//                           <a
//                             href={item.href}
//                             className={classNames(active ? "bg-gray-50" : "", "block px-3 py-1 text-sm leading-6 text-gray-900")}
//                           >
//                             {item.name}
//                           </a>
//                         )}
//                       </Menu.Item>
//                     ))}
//                     <Menu.Item>
//                       {({ active }) => (
//                         <button
//                           type="button"
//                           className="text-black focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm mr-9 p-4 py-2 text-center"
//                           onClick={handleWalletLogout}
//                         >
//                           {openWalletModal ? "Connect Wallet" : "Sign out"}
//                         </button>
//                       )}
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavBar;

import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useWallet } from "@txnlab/use-wallet";
import TruncatedCell from "@/components/TruncatedCell";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const { providers, activeAddress } = useWallet();

  const handleWalletLogout = async () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive);
      if (activeProvider) {
        await activeProvider.disconnect();
      }
    }
    window.location.href = "/";
  };
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 h-20 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/admin/dashboard">
                  <img
                    className="h-10"
                    src="https://rahat.io/_next/image?url=%2Fimages%2Flogo%2Flogo-dark.png&w=384&q=75"
                    alt="Your Company"
                  />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-bold text-blue-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/project"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-blue-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Projects
                  </Link>
                  
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <p className="text-white">{<TruncatedCell text={activeAddress?.toString() ?? ""} />}</p>
                      <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmYB6XE3DV1YfFD3Y41ej68S8pg2lbxMecA&usqp=CAU"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({}: any): any => ( // Change the type to ReactNode
                          <button
                            type="button"
                            className="text-black focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm mr-9 p-4 py-2 text-center"
                            onClick={handleWalletLogout}
                          >
                            {openWalletModal ? "Connect Wallet" : "Sign out"}
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <p className="text-white">{<TruncatedCell text={activeAddress?.toString() ?? ""} />}</p>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmYB6XE3DV1YfFD3Y41ej68S8pg2lbxMecA&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
