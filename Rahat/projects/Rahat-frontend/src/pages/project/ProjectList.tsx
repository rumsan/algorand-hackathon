import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};
const projects = [
  {
    id: 1,
    name: 'Monsoon Flood Project',
    imageUrl:
      'https://civil-protection-humanitarian-aid.ec.europa.eu/sites/default/files/styles/ewcms_metatag_image/public/2022-03/Monsoon%20floods%20in%20Nepal%20-%20helping%20the%20most%20vulnerable%20through%20disaster%20preparedness%2001.jpg?itok=CQtiXqiT',
    lastInvoice: {
      date: 'December 13, 2022',
      dateTime: '2022-12-13',
      amount: '2,000.00 USDT',
      status: 'Not started',
    },
  },
  {
    id: 2,
    name: 'Education Donation',
    imageUrl:
      'https://www.un.org/sites/un2.un.org/files/styles/large-article-image-style-16-9/public/field/image/2022/08/nepal-_reaching_the_most_disadvantaged_children_with_education.png',
    lastInvoice: {
      date: 'January 22, 2023',
      dateTime: '2023-01-22',
      amount: '14,000.00 USDT',
      status: 'Paid',
    },
  },
  {
    id: 3,
    name: 'Earthquake Relief',
    imageUrl:
      'https://www.icrc.org/sites/default/files/styles/document_main/public/document/image/150504-nepal-earthquake-image-11.jpg?itok=zepl3N3G',
    lastInvoice: {
      date: 'January 23, 2023',
      dateTime: '2023-01-23',
      amount: '7,600.00 USDT',
      status: 'Paid',
    },
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectList() {
  return (
    <>
      <div className="sm:flex sm:items-center mb-3">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Project
          </button>
        </div>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {projects.map((project) => (
          <Link to={`/admin/${project.id}`} key={project.id} className="overflow-hidden rounded-xl border border-gray-200">
            <li key={project.id} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div className="text-sm font-medium leading-6 text-gray-900">{project.name}</div>
                <Menu as="div" className="relative ml-auto">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                          <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                            View<span className="sr-only">, {project.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                            Edit<span className="sr-only">, {project.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Start Date</dt>
                  <dd className="text-gray-700">
                    <time dateTime={project.lastInvoice.dateTime}>{project.lastInvoice.date}</time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Donation</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{project.lastInvoice.amount}</div>
                    <div
                      className={classNames(
                        statuses[project.lastInvoice.status],
                        'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {project.lastInvoice.status}
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
