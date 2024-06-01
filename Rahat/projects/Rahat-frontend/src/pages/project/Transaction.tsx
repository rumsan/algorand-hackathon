import { useLayoutEffect, useRef, useState } from 'react';
import { useAlgorandAssetInfo } from '../../hooks/useAlgorandInfo';

import SideBar from '@/components/SideBar';

const people = [
  {
    id: 1,
    beneficiaryId: 'B12345',
    from: '0xabcdef1234567890abcdef1234567890abcdef00',
    to: '0x1234567890abcdef1234567890abcdef12345600',
    timestamp: '2024-05-24T10:30:00Z',
    txnHash: '0x123abc',
    amount: '100.00',
    txnFee: '1.00',
  },
  {
    id: 2,
    beneficiaryId: 'B54321',
    from: '0x7890abcdef1234567890abcdef1234567890abcd',
    to: '0xef1234567890abcdef1234567890abcdef123400',
    timestamp: '2024-05-23T11:00:00Z',
    txnHash: '0x456def',
    amount: '50.00',
    txnFee: '0.50',
  },
  {
    id: 3,
    beneficiaryId: 'B67890',
    from: '0xabcdefabcdefabcdefabcdefabcdefabcdef00',
    to: '0xabcdefabcdefabcdefabcdefabcdefabcdef01',
    timestamp: '2024-05-22T12:15:00Z',
    txnHash: '0x789ghi',
    amount: '200.00',
    txnFee: '2.00',
  },
  {
    id: 4,
    beneficiaryId: 'B09876',
    from: '0x1234567890123456789012345678901234567890',
    to: '0x0987654321098765432109876543210987654321',
    timestamp: '2024-05-21T09:45:00Z',
    txnHash: '0xabc123',
    amount: '150.00',
    txnFee: '1.50',
  },
  {
    id: 5,
    beneficiaryId: 'B11223',
    from: '0x0abcdef1234567890abcdef1234567890abcdef0',
    to: '0x0abcdef0987654321098765432109876543210ab',
    timestamp: '2024-05-20T14:30:00Z',
    txnHash: '0xdef456',
    amount: '75.00',
    txnFee: '0.75',
  },
];

export default function TransactionPage() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const { assetInfo, loading: assetLoading, error: assetError } = useAlgorandAssetInfo(671526136);

  console.log(assetInfo);

  useLayoutEffect(() => {
    const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 ml-64 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                {selectedPeople.length > 0 && (
                  <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        BeneficiaryId
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        From
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        To
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Timestamp
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        TxnHash
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        TxnFee
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.beneficiaryId} className={selectedPeople.includes(person) ? 'bg-gray-50' : undefined}>
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          {selectedPeople.includes(person) && <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            value={person.beneficiaryId}
                            checked={selectedPeople.includes(person)}
                            onChange={(e) =>
                              setSelectedPeople(e.target.checked ? [...selectedPeople, person] : selectedPeople.filter((p) => p !== person))
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.beneficiaryId}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.from}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.to}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.timestamp}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.txnHash}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${person.amount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${person.txnFee}</td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {person.beneficiaryId}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
