import { URLS } from '@/constants';
import useGet from '@/hooks/useGet';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function SideBar() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [showTokenDetail, setShowTokenDetail] = useState(false);
  const { data } = useGet(`getById${id}`, URLS.PROJECT, id as string);

  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      setProject(data);
      if(data.voucherId !== null) {
      setShowTokenDetail(true);
      }
    }
  }, [data]);

  console.log(project, 'beneficiaries');

  if (!project) {
    return <div>Loading...</div>;
  }
  const navigation = [
    {
      name: 'Project Asset',
      // href: showTokenDetail ? `/admin/project/${id}/voucherDetails` : `/admin/project/${id}`,

      href: showTokenDetail ? `/admin/project/${id}/token-detail` : `/admin/project/${id}/create-asa`,
    },
    {
      name: 'Projects Details',
      href: `/admin/project/${id}`,
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
  ];
  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-md p-4">
      <nav className="mt-20">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />{' '}
        <br />
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md">
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
