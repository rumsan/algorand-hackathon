import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useList from '@/hooks/useList';
import { URLS } from '../../constants';
import NoProjects from '@/components/NoProjects';
import { PlusIcon } from '@heroicons/react/20/solid';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type project = {
  uuid: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  voucherId: number;
};

export default function ProjectList() {
  localStorage.removeItem('voucher')
  const [projects, setProjects] = useState<project[]>([]);

  let { isLoading, isError, data } = useList('listProject', URLS.PROJECT, 1, 6);


  useEffect(() => {
    if (data) {
      setProjects(data.data);
    }
  }, [data, setProjects]);

  return (
    <>
      {/* <NoProjects /> */}

      {projects.length ? (
        <div>
          {' '}
          <div className="sm:flex sm:items-center mb-3">
            <div className="sm:flex-auto"></div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                to={`/admin/project/add`}
                type="button"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                New Project
              </Link>
            </div>
          </div>
          <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            {projects.map((project) => (
              <Link to={`/admin/project/${project.uuid}`} key={project.uuid} className=" ">
                <li key={project.uuid} className="overflow-hidden rounded-xl border border-gray-200">
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
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
                              >
                                View<span className="sr-only">, {project.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
                              >
                                Edit<span className="sr-only">, {project.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin/invite-member"
                                className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
                              >
                                Invite<span className="sr-only">, {project.name}</span>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
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
                        {/* <div
                      className={classNames(
                        statuses[project.name],
                        'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {project.name}
                    </div> */}
                      </dd>
                    </div>
                  </dl>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <NoProjects />
      )}
    </>
  );
}
