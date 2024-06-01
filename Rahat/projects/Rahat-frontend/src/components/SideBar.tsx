import React from 'react';
import { Link, useParams } from 'react-router-dom';

function SideBar() {
  const { id } = useParams();
  const navigation = [
    {
      name: 'Projects',
      href: '/admin/project/',
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
        <h1 className="text-2xl pt-6">Project details</h1>
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
