/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react';

import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
];

const project = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Community Park Renovation',
  totalDonation: 50000,
  status: 'Active',
  token: 'CPR123456',
  estimatedBudget: 140000,
  creationDate: '2023-01-15',
};






export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
         
          <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
            {navigation.map((item, itemIdx) => (
              <a key={itemIdx} href={item.href}>
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-x-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>
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
                  <div className=" text-sm leading-6 text-gray-500">
                    Project id <span className="text-gray-700">{project.uuid}</span>
                  </div>
                  <div className=" text-2xl mt-1  font-semibold leading-6 text-gray-900">{project.name}</div>
                  <div className="text-sm leading-6 text-gray-500">
                    status <span className="text-gray-700">{project.status}</span>
                  </div>{' '}
                </h1>
              </div>
              {/* <div className="flex items-center gap-x-4 sm:gap-x-6">
                <button type="button" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                  Copy URL
                </button>
                <a href="#" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                  Edit
                </a>
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </a>

                <Menu as="div" className="relative sm:hidden">
                  <Menu.Button className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
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
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                            )}
                          >
                            Copy URL
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-x-8">
            {/* Invoice */}
            <div className="w-1/2 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-2xl font-semibold leading-6 text-gray-900">Project</h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500">Issued on</dt>{' '}
                  <dd className="inline text-gray-700">
                    <time className="text-xl" dateTime="2023-23-01">
                      {project.creationDate}
                    </time>
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                  <dt className="inline text-gray-500">Due on</dt>{' '}
                  <dd className="inline text-gray-700">
                    <time dateTime="2023-31-01">...</time>
                  </dd>
                </div>
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">Vendor</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900 text-2xl">11</span>
                    <br />
                    Total
                    <br />
                    {/* Toronto, ON N3Y 4H8 */}
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">Beneficiary</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900 text-2xl">25</span>
                    <br />
                    Total
                    <br />
                    {/* New York, NY 12345 */}
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
                {/* <thead className="border-b border-gray-200 text-gray-900">
          <tr>
            <th scope="col" className="px-0 py-3 font-semibold">
              Projects
            </th>
            <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
              Hours
            </th>
            <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
              Rate
            </th>
            <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
              Price
            </th>
          </tr>
        </thead> */}
                {/* <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="max-w-0 px-0 py-5 align-top">
                <div className="truncate font-medium text-gray-900">{item.title}</div>
                <div className="truncate text-gray-500">{item.description}</div>
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">{item.hours}</td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">{item.rate}</td>
              <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
            </tr>
          ))}
        </tbody> */}
                {/* <tfoot>
          <tr>
            <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
              Subtotal
            </th>
            <th scope="row" colSpan={3} className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell">
              Subtotal
            </th>
            <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
          </tr>
          <tr>
            <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
              Tax
            </th>
            <th scope="row" colSpan={3} className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell">
              Tax
            </th>
            <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
          </tr>
          <tr>
            <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
              Total
            </th>
            <th scope="row" colSpan={3} className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell">
              Total
            </th>
            <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">{invoice.total}</td>
          </tr>
        </tfoot> */}
              </table>
            </div>

            {/* Budget */}
            <div className="w-1/2 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-2xl font-semibold leading-6 text-gray-900">Budget</h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4 text-gray-500">
                  <dt className="font-semibold text-gray-900">Estimated Budget</dt>
                  <dd className="mt-2 text-xl text-gray-600">Rp {project.estimatedBudget}</dd>
                  <br />
                  Vouchers Assigned
                  <br />
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4 text-gray-500">
                  <dt className="font-semibold text-gray-900">Actual Budget</dt>
                  <dd className="mt-2 text-xl text-gray-600">Rp...</dd>
                  <br className="text-gray-400" />
                  Vouchers Redeemed Value
                  <br />
                </div>
              </dl>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">Voucher Redeem</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">9</span>
                    <br />
                    Total Vouchers Claimed
                    <br />
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">Voucher</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">105</span>
                    <br />
                    Free
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
        </div>
      </main>
    </>
  );
}
