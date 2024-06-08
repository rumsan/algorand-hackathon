import { URLS } from '@/constants';
import useGet from '../hooks/useGet';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import projectIcon from '../assets/projectDetail.png'; // Import the image correctly
import transaction from '../assets/transaction.png';
import vendor from '../assets/vendor.png';
import beneficiary from '../assets/beneficiary.png';

function SideBar() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [showVendorDetail, setShowVendorDetail] = useState(false);

  const { data } = useGet(`getById${id}`, URLS.PROJECT, id as string);

  useEffect(() => {
    if (data) {
      setProject(data);

      if (data.vendorId !== null) {
        setShowVendorDetail(true);
      }
    }
  }, [data]);


  const p = localStorage.getItem('project');
  let pid = p ? JSON.parse(p).uuid : null;

  const navigation = [
    {
      name: 'Project Details',
      href: `/admin/project/${pid}`,
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>
      ),

      current: false,
    },
    {
      name: 'Beneficiaries',
      href: `/admin/project/${id}/beneficiary`,
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Transactions',
      href: `/admin/project/${id}/transactions`,
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Vendor',
      href: showVendorDetail ? `/admin/project/${id}/vendor` : `/admin/project/${id}/create-vendor`,
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
      current: false,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4 mt-16">
      <nav className="mt-20">
        <br />
        <ul className="space-y-9">
          {navigation.map((item) => (
            <li key={item.name} className="flex items-center">
              {' '}
              {/* Add flex class for horizontal alignment */}
              {/* <img src={item.image} alt="" className=" w-9 mr-2" /> */}
              <div>{item.image}</div>
              <Link to={item.href} className="block p-2 text-lg font-medium text-blue-900 hover:bg-gray-200 rounded-md">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
