import { PlusIcon } from '@heroicons/react/20/solid';
import { Link, useParams } from 'react-router-dom';

export default function NoBeneficiary() {
  const { id } = useParams();
  return (
    <div className="text-center ">
     
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>

      <h3 className="mt-2 text-sm font-semibold text-gray-900">No beneficiaries</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding new Beneficiary to this project.</p>
      <div className="mt-6">
        <Link
          to={`/admin/project/${id}/add-beneficiary`}
          type="button"
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          New Beneficiary
        </Link>
      </div>
    </div>
  );
}
