import SideBar from '../../components/SideBar';
import { Link, useParams, Navigate } from 'react-router-dom';
import { typedClient } from '@/utils/typedClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SnackbarUtilsConfigurator } from '../../components/Toaster';
import * as snack from '../../components/Toaster';
import addAdminSchema from '@/validation/addAdminSchema';
import { useForm } from 'react-hook-form';
import { useWallet } from '@txnlab/use-wallet';
import algosdk from 'algosdk';
import { useEffect, useState } from 'react';
import { asaId } from '@/utils/asaId';
import usePost from '@/hooks/usePost';
import { URLS } from '@/constants';

type AdminType = z.infer<typeof addAdminSchema> & { activeAddress?: string };

export default function addAdmin() {
  const { id } = useParams();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { postMutation, data, isError, isSuccess } = usePost('addAdmin');
  const [projectDetails, setProjectDetails] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: {
      adminIds: '',
    },
  });

  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };

  const getProjectDetails = async () => {
    try {
      const boxKey = algosdk.bigIntToBytes(asaId, 8);
      const res = await typedClient.getProject(
        {
          _assetId: asaId,
        },
        {
          sender,
          boxes: [
            {
              appIndex: 0,
              name: boxKey,
            },
          ],
        }
      );

      console.log('This returns', res?.return);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  const onSubmit = async (data: AdminType) => {
    // console.log(activeAddress)
    const boxKey = algosdk.bigIntToBytes(asaId, 8);
    const res = await typedClient.addAdminToProject(
      {
        _address: data.adminIds,
        _assetId: asaId,
      },
      {
        sender,
        boxes: [
          {
            appIndex: 0,
            name: boxKey,
          },
        ],
      }
    );
    console.log(res?.return);

    data.activeAddress = activeAddress;

    console.log(data);
    postMutation({ urls: `${URLS.PROJECT}/${id}` + '/addAdmins', data });
  };

  const testBtn = async () => {
    const boxKey = algosdk.bigIntToBytes(asaId, 8);
    const res = await typedClient.getProject(
      {
        _assetId: asaId,
      },
      {
        sender,
        boxes: [
          {
            appIndex: 0,
            name: boxKey,
          },
        ],
      }
    );
  };
  useEffect(() => {
    if (isSuccess) {
      snack.default.success('Admin added successfully');
      setShouldNavigate(true);
    } else if (isError) {
      snack.default.error('There was a problem with your request');
    }
  }, [isSuccess, isError]);

  const route = `/admin/project/${id}`;
  if (shouldNavigate) {
    return <Navigate to={route} replace />;
  }
  console.log(isSuccess, isError, data);
  return (
    <>
      <div className="flex">
        <SideBar />

        {/* Main Content */}
        <div className="pl-52 pt-16 w-full flex justify-center">
          <SnackbarUtilsConfigurator />

          <div className="space-y-10 divide-y divide-gray-900/10 w-full max-w-4xl px-4 pb-80">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-50 text-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3"
              >
                <div className="px-4 py-6 sm:p-8">
                  <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-blue-900">Add New Admin</h2>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Enter the wallet address of the new admin to add them to the project.
                    </p>
                  </div>
                  <br />
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Wallet Address
                      </label>
                      <div className="mt-2">
                        <input
                          {...register('adminIds')}
                          type="text"
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {/* {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <Link to={`/admin/project/${id}/`} className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
