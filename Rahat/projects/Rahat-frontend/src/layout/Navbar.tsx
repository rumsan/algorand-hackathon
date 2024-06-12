import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@txnlab/use-wallet";
import TruncatedCell from "@/components/TruncatedCell";
import AskAi from "@/components/AskAI";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const [askOpen, setAskOpen] = useState(false);

  const { providers, activeAddress } = useWallet();

  const location = useLocation();

  const handleWalletLogout = async () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive);
      if (activeProvider) {
        await activeProvider.disconnect();
      }
    }
    window.location.href = "/";
  };

  const handleSearchOpen = () => {
    setAskOpen(!askOpen);
  };

  const hideImage = location.pathname.startsWith("/admin/project/");

  return (
    <Disclosure as="nav" className="  bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 h-20 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-evenly items-center">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  {!hideImage && (
                    <Link to="/admin/dashboard">
                      <img
                        className="h-10"
                        src="https://rahat.io/_next/image?url=%2Fimages%2Flogo%2Flogo-dark.png&w=384&q=75"
                        alt="Your Company"
                      />
                    </Link>
                  )}
                </div>

                <div className={`hidden lg:ml-6 lg:flex lg:space-x-8 ${hideImage ? "pl-24" : ""}`}>
                  <Link
                    to="/admin/dashboard"
                    className={classNames(
                      location.pathname === "/admin/dashboard"
                        ? "border-indigo-500 text-blue-900"
                        : "border-transparent text-gray-500  hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-bold"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/project"
                    className={classNames(
                      location.pathname === "/admin/project"
                        ? "border-indigo-500 text-blue-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-bold"
                    )}
                  >
                    Projects
                  </Link>
                </div>
              </div>
              {/* <div className="flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
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
                      className="block w-[500px] rounded-md border-0  bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search or ask rumee"
                      type="search"
                    />
                  </div>
                </div>
              </div> */}
              <AskAi open={askOpen} setOpen={setAskOpen} />
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
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:justify-center">
                <button className="ml-4 flex gap-3 flex-shrink-0 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <Link to="/admin/ask-rumi"> Ask RUMI</Link>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <p className="text-white pr-2">{<TruncatedCell text={activeAddress?.toString() ?? ""} />}</p>
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
        </>
      )}
    </Disclosure>
  );
}
