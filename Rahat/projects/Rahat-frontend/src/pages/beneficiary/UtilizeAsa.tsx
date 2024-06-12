import { SnackbarUtilsConfigurator } from '@/components/Toaster';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { algodClient, typedClient } from '../../utils/typedClient';
import RahatSendTokenToVendor from '@/components/contracts/RahatSendTokenToVendor';
import useGet from '@/hooks/useGet';
import { URLS } from '@/constants';

function UtilizeAsa() {
  const { id } = useParams<{ id: string }>();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [utilizeToken, setUtilizeToken] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [assetStatus, setAssetStatus] = useState({ isFrozen: false, isCreated: true, amount: 0 });

  const check = async () => {
    if (id) {
      const accountInfo = await algodClient.accountInformation(id).do();
      const assetHolding = accountInfo.assets.find((asset: any) => asset['asset-id'] === selectedProject?.voucherId);
      if (assetHolding) {
        setAssetStatus({ isFrozen: assetHolding['is-frozen'], isCreated: true, amount: assetHolding.amount });
      } else {
        setAssetStatus({ isFrozen: false, isCreated: false, amount: 0 });
      }
      setBalance(accountInfo.amount);
      console.log(accountInfo.assets, 'accountInfo');
      console.log(selectedProject?.voucherId);
    }
  };

  useEffect(() => {
    check();
  }, [id, selectedProject]);

  const { data } = useGet(`getById${id}`, `${URLS.BENEFICIARY}/find-by-wallet`, id);

  useEffect(() => {
    if (data) {
      setProjects(data?.projects);
    }
    localStorage.setItem('projects', JSON.stringify(data?.projects));

    // const storedVoucher = localStorage.getItem('voucher');
    // if (storedVoucher) {
    //   setVoucher(JSON.parse(storedVoucher));
    // }
  }, [data]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    const project = projects.find((proj: any) => proj.uuid === projectId);
    setSelectedProject(project);
  };

  const backRoute = `/beneficiary/details/${id}`;
  console.log(projects);
  return (
    <div className="h-screen flex items-center justify-center">
      <SnackbarUtilsConfigurator />

      <div className="space-y-10 divide-y divide-gray-900/10 w-full max-w-4xl px-4 pb-80">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <form className="bg-gray-50 text-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
            <div className="px-4 py-6 sm:p-8">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-blue-900">Utilize ASA</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Please select the project from which you want to utilize the ASA.</p>
              </div>
              <br />
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="project" className="block text-sm font-medium leading-6 text-gray-900">
                    Project
                  </label>
                  <div className="mt-2">
                    <select
                      id="project"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleProjectChange}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a project
                      </option>
                      {projects.map((project: any) => (
                        <option key={project.uuid} value={project.uuid}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedProject && (
                  <div className="sm:col-span-3">
                    <label htmlFor="vendor" className="block text-sm font-medium leading-6 text-gray-900">
                      Vendor
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="vendor"
                        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={selectedProject?.vendor?.name || ''}
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <div className="col-span-full">
                  <label htmlFor="balance" className="block text-sm font-medium leading-6 text-gray-900">
                    Your Balance : {assetStatus?.amount}
                  </label>
                </div>
                <div className="col-span-full">
                  <label htmlFor="utilizeToken" className="block text-sm font-medium leading-6 text-gray-900">
                    Utilize Token
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="utilizeToken"
                      className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={utilizeToken}
                      onChange={(e) => setUtilizeToken(Number(e.target.value))}
                    />
                  </div>
                  
                  {selectedProject?.vendor?.name && <div className='bg-green-200 text-green-800 p-2 rounded mt-6'>You will receive {utilizeToken} sack of rice from {selectedProject?.vendor?.name}</div>}
                </div>
              </div>
              
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Link
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                to={backRoute}
              >
                Cancel
              </Link>
              <RahatSendTokenToVendor
                buttonClass="bg-blue-600 p-1 rounded-sm"
                buttonLoadingNode={<span className="loading loading-spinner" />}
                buttonNode=" Send Token To Vendor"
                venderAddress={selectedProject?.vendor?.walletAddress || ''}
                amount={utilizeToken}
                assetId={selectedProject?.voucherId || 0}
                typedClient={typedClient}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UtilizeAsa;
