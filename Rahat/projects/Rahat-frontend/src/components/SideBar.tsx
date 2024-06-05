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
      console.log(data, 'data');
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
      image: projectIcon,
      current: false,
    },
    {
      name: 'Beneficiaries',
      href: `/admin/project/${id}/beneficiary`,
      image: beneficiary,
      current: false,
    },
    {
      name: 'Transactions',
      href: `/admin/project/${id}/transactions`,
      image: transaction,
      current: false,
    },
    {
      name: 'Vendor',
      href: showVendorDetail ? `/admin/project/${id}/vendor` : `/admin/project/${id}/create-vendor`,
      image: vendor,
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
              <img src={item.image} alt="" className=" w-10 mr-2" /> {/* Move image to the left */}
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
