import { URLS } from '@/constants';
import useGet from '@/hooks/useGet';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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

  if (!project) {
    return <div>Loading...</div>;
  }
const p = localStorage.getItem('project');
let pid = p ? JSON.parse(p).uuid : null;
  const navigation = [
    {
      name: 'Projects Details',
      href: `/admin/project/${pid}`,
      current: false,
    },
    {
      name: 'Beneficiaries',
      href: `/admin/project/${id}/beneficiary`,
    },
    {
      name: 'Transactions',
      href: `/admin/project/${id}/transactions`,
      current: false,
    },
    {
      name: 'Vendor',
      href: showVendorDetail ? `/admin/project/${id}/vendor` : `/admin/project/${id}/create-vendor`,
      current: false,
    },
  ];
  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4 mt-14">
      <nav className="mt-20">
        {/* <img
          src={project.imageUrl}
          alt={project.name}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />{' '} */}
        <br />
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="block p-2 text-xl text-blue-900  hover:bg-gray-200 rounded-md">
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
