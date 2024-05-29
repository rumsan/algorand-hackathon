import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import projectSchema from '../../validation/projectSchema';
import { useEffect, useState } from 'react';
import usePost from '../../hooks/usePost';

type ProjectType = z.infer<typeof projectSchema>;

export default function AddProject() {
  const { postMutation, data, isSuccess, error, success, isPending } = usePost('false');
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      donation: 0,
      status: 'Pending',
      token: 0,
      imageUrl: '',
    },
  });

  const onSubmit = (data: ProjectType) => {
    console.log(data, 'pahe');
    // postMutation({ urls: URLS.AUTH + '/register', data });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-10 divide-y divide-gray-900/10 w-full max-w-4xl px-4 pb-80">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-100 text-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Project Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Include all relevant details about your project to ensure accurate evaluation and feedback.
                </p>
              </div>
              <br />
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Project name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="donation" className="block text-sm font-medium leading-6 text-gray-900">
                    Total donation
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('donation')}
                      type="number"
                      id="donation"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.donation && <p className="text-red-500">{errors.donation.message}</p>}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                    Status
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('status')}
                      id="status"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Running">Running</option>
                    </select>
                    {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="token" className="block text-sm font-medium leading-6 text-gray-900">
                    Project token
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('token')}
                      type="number"
                      id="token"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.token && <p className="text-red-500">{errors.token.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    Image URL
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('imageUrl')}
                      type="text"
                      id="imageUrl"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
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
  );
}
