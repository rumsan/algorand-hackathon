import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useWallet } from '@txnlab/use-wallet';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, BellIcon, Cog6ToothIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Link, Outlet } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';
import TruncatedCell from '@/components/TruncatedCell';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, current: false },
  { name: 'Projects', href: '/admin/project', icon: FolderIcon, current: false },
  {
    name: 'Beneficiaries',
    href: '/admin/beneficiary',
    icon: UsersIcon,
    current: false,
  },
 
];

const userNavigation = [{ name: 'Your profile', href: '#' }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const NavBar = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const { providers, activeAddress } = useWallet();

  const handleWalletLogout = async () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive);
      if (activeProvider) {
        await activeProvider.disconnect();
      }
    }
    window.location.href = '/';
  };

  return (
    <>
      <div>
        <div className="lg:fixed lg:top-0 lg:w-full lg:z-50">
          <div className="flex h-20 items-center bg-gray-900 px-20">
            <div className="flex items-center">
              <img
                className="h-16 pr-5 w-auto"
                src="https://assets.rumsan.net/rumsan-group/footer-esatya-rahat-logo.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex-1">
              <ul role="list" className="flex gap-x-6">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex items-center gap-x-3 rounded-md px-4 py-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      {/* <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center ml-auto">
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  {/* //@ts-ignore */}
                  <p className="text-white">{<TruncatedCell text={activeAddress?.toString() ?? ''} />}</p>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmYB6XE3DV1YfFD3Y41ej68S8pg2lbxMecA&usqp=CAU"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className="text-black focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm mr-9 p-4 py-2 text-center"
                          onClick={handleWalletLogout}
                        >
                          {openWalletModal ? 'Connect Wallet' : 'Sign out'}
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

