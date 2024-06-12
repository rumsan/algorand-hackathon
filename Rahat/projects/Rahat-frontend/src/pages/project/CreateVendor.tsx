import SideBar from '@/components/SideBar';
import { SnackbarUtilsConfigurator } from '@/components/Toaster';
import { URLS } from '@/constants';
import z from 'zod';
import { useForm } from 'react-hook-form';

import usePost from '@/hooks/usePost';
import vendorSchema from '@/validation/vendorSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import * as snack from '../../components/Toaster';
import { Navigate, useParams } from 'react-router-dom';
import { Building } from 'lucide-react';
import { BuildingOffice2Icon } from '@heroicons/react/20/solid';
import LoadingSpinner from '@/components/LoadingSpinner';

type VendorType = z.infer<typeof vendorSchema>;

function CreateVendor() {
  const { id } = useParams();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { postMutation, data, isSuccess, error, success, isError, isPending } = usePost('vendor');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorType>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: '',
      email: '',
      location: '',
      walletAddress: '',
      // projectId: '',
    },
  });

  const onSubmit = async (data: VendorType) => {
    console.log('ajhsdj');
    // console.log(data);
    // @ts-ignore

    data.projectId = id;
    console.log(data);

    await postMutation({ urls: URLS.VENDOR, data });
  };

  useEffect(() => {
    if (isSuccess) {
      snack.default.success('Vendor created successfully');
      setShouldNavigate(true);
    } else if (isError) {
      snack.default.error('There was a problem with your request');
    }
  }, [isSuccess, isError]);

  if (isPending) {
    return (
      <div>
        <LoadingSpinner visible={true} />
      </div>
    );
  }
  if (shouldNavigate) {
    const route = `/admin/project/${id}`;
    return <Navigate to={route} replace />;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="ml-56 pl-52 pt-24 w-full">
        <div className=" w-full max-w-4xl px-4 ">
          <>
            <div>
              <SnackbarUtilsConfigurator />
            </div>
            <form
              className="p-5  text-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3  "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-6">
                <div className="pb-12">
                  <div>
                    <h2 className="mt-2 mb-2 text-1xl font-semibold leading-6 text-blue-900">Create A New Vendor</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Start by adding vendors to streamline your procurement process and organize vendor information effectively.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                      <div className="mt-2">
                        <input
                          {...register('name')}
                          type="text"
                          // name="firstName"
                          // id="first-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                      <div className="mt-2">
                        <input
                          {...register('email')}
                          type="email"
                          name="email"
                          id="e-mail"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                      <div className="mt-2">
                        <input
                          {...register('location')}
                          type="text"
                          // name="first-name"
                          // id="first-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2"
                        />
                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Wallet Address</label>
                      <div className="mt-2">
                        <input
                          {...register('walletAddress')}
                          type="text"
                          name="walletAddress"
                          id="walletAddress"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2"
                        />
                        {errors.walletAddress && <p className="text-red-500">{errors.walletAddress.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-end gap-2">
                    {/* <button
                      onClick={() => {}}
                      className="rounded-md bg-red-500 px-1  py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 w-[20%] focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      cancel
                    </button> */}
                    <button
                      type="submit"
                      className="rounded-md bg-blue-500 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 w-[20%] focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        </div>
      </div>
    </div>
  );
}

export default CreateVendor;
