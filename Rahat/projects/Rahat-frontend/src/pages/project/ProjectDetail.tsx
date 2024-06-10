import SideBar from '@/components/SideBar';
import { Link, useParams } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import useGet from '@/hooks/useGet';
import { URLS } from '@/constants';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {useWallet} from '@txnlab/use-wallet'

import { EllipsisVerticalIcon } from 'lucide-react';

import ProjectAge from '@/components/chart/ProjectAge';
import ProjectGender from '@/components/chart/ProjectGender';
import TruncatedCell from '@/components/TruncatedCell';
import Loader from '@/components/Loader';

export const navigation = [
  {
    name: 'Projects',
    href: '/admin/project/',
    current: false,
  },
  {
    name: 'Beneficiaries',
    href: '/admin/project/beneficiary',
  },
  {
    name: 'Transactions',
    href: '/admin/transactions',
    current: false,
  },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
export default function Example() {
  const {activeAddress} = useWallet()
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [showVendorDetail, setShowVendorDetail] = useState(false);

  const { data } = useGet(`getById${id}`, URLS.PROJECT, id as string);

  const vid = project?.voucherId;

  let { data: voucher } = useGet(`getVoucher${id}`, URLS.VOUCHER, vid as string);
  voucher ? localStorage.setItem('voucher', JSON.stringify(voucher)) : null;

  useEffect(() => {
    if (data) {
      setProject(data);
      localStorage.setItem('voucherId', JSON.stringify(data.voucherId));
      if (data.vendorId !== null) {
        setShowVendorDetail(true);
      }
    }
  }, [data]);


  if (project) {
   
    localStorage.setItem('project', JSON.stringify(project));
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
                <div className="flex items-center gap-x-11">
                  <img src={project?.imageUrl} alt="" className="h-20 w-24 flex-none rounded-full ring-1 ring-gray-900/10" />
                  <h1>
                    <div className=" text-sm leading-6 text-gray-500">
                      Project id <span className="text-gray-700">{project?.uuid}</span>
                    </div>
                    <div className=" text-2xl mt-1  font-semibold leading-6 text-blue-900">{project?.name}</div>
                    <div className="text-sm leading-6 text-gray-500">
                      status <span className="text-gray-700">{project?.status}</span>
                    </div>{' '}
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
                          {
                            !showVendorDetail && (
                          <Menu.Item>
                            <Link className="block px-3 py-1 text-sm leading-6 text-gray-900" to={`/admin/project/${id}/create-vendor`}>
                              Add Vendor
                            </Link>
                          </Menu.Item>
                            )

                          }
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-between gap-x-8">
              {/* Project Details */}
              <div className="w-1/2 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-2xl font-semibold leading-6 text-blue-900">Project</h2>

                <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                    <dt className="font-semibold text-gray-900">Vendor</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900 text-2xl">1</span>
                      <br />
                      Total
                      <br />
                    </dd>
                  </div>
                  <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                    <dt className="font-semibold text-gray-900">Beneficiary</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900 text-2xl">{project?.beneficiaries?.length}</span>
                      <br />
                      Total
                      <br />
                    </dd>
                  </div>

                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                    <dt className="font-semibold text-gray-900">Created on</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-small text-gray-700 text-xl">{project?.createdAt}</span>
                      <br />

                      <br />
                    </dd>
                  </div>
                  <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                    <dt className="font-semibold text-gray-900">Created By</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-small text-gray-700 text-xl">{<TruncatedCell text={project?.superAdmin ?? ''} />}</span>
                      <br />

                      <br />
                    </dd>
                  </div>
                </dl>
                <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                  <colgroup>
                    <col className="w-full" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                </table>
              </div>

              {/* Budget Details */}
              <div className="w-1/2 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-2xl font-semibold leading-6 text-blue-900">Asset</h2>
                <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                    <dt className="font-semibold text-gray-900">Asset Name</dt>
                    <dd className="mt-2 text-xl text-gray-600"> {voucher?.voucherName ? voucher.voucherName : '...'}</dd>
                    <br />

                    <br />
                  </div>
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                    <dt className="font-semibold text-gray-900">Asset Symbol</dt>
                    <dd className="mt-2 text-xl text-gray-600"> {voucher?.voucherSymbol ? voucher.voucherSymbol : '...'}</dd>
                    <br />

                    <br />
                  </div>
                  {/* </dl> */}
                  {/* <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2 "> */}
                  <div className="mt-1 border-t border-gray-900/5 pt-6 sm:pr-4 ">
                    <dt className="font-semibold text-gray-900">Disbursed ASA</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900">100</span>
                      <br />
                      To Beneficiary
                      <br />
                    </dd>
                  </div>
                  <div className="mt-1 sm:mt-1 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6 ">
                    <dt className="font-semibold text-gray-900">Redeemed ASA</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900">10</span>
                      <br />
                      By Beneficiary
                      <br />
                    </dd>
                  </div>
                </dl>
                <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                  <colgroup>
                    <col className="w-full" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                </table>
              </div>
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
