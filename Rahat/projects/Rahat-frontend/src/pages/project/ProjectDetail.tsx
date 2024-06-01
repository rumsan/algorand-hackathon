import SideBar from '@/components/SideBar';
import { Link } from 'react-router-dom';

const project = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Community Park Renovation',
  totalDonation: 50000,
  status: 'Active',
  token: 'CPR123456',
  estimatedBudget: 140000,
  creationDate: '2023-01-15',
};

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

export default function Example() {
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
                    <div className=" text-sm leading-6 text-gray-500">
                      Project id <span className="text-gray-700">{project.uuid}</span>
                    </div>
                    <div className=" text-2xl mt-1  font-semibold leading-6 text-gray-900">{project.name}</div>
                    <div className="text-sm leading-6 text-gray-500">
                      status <span className="text-gray-700">{project.status}</span>
                    </div>{' '}
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-between gap-x-8">
              {/* Project Details */}
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
                    </dd>
                  </div>
                  <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                    <dt className="font-semibold text-gray-900">Beneficiary</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900 text-2xl">25</span>
                      <br />
                      Total
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
          </main>
        </div>
      </div>
    </>
  );
}
