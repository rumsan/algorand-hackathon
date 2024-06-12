import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import projectSchema from "../../validation/projectSchema";
import { useEffect, useState } from "react";
import { SnackbarUtilsConfigurator } from "../../components/Toaster";
import * as snack from "../../components/Toaster";
import { Link, Navigate, useParams } from "react-router-dom";

import usePost from "../../hooks/usePost";
import { SERVER_URL, URLS } from "@/constants";
import { useWallet } from "@txnlab/use-wallet";
import { typedClient } from "@/utils/typedClient";
import algosdk from "algosdk";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import API from "@/utils/API";
import Loader from "@/components/Loader";
import Stepper from "@/components/stepper";
import { Loader2 } from "lucide-react";

type ProjectType = z.infer<typeof projectSchema>;

export default function AddProject() {
  const { id } = useParams();

  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! }

  const [loading, setLoading] = useState(0);

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { postMutation, data: projectData, isSuccess, error, success, isError, isPending } = usePost("listProject");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    },
  });

  const onSubmit = async (data: ProjectType) => {
    setLoading(1)

    const adminAddress = [activeAddress];
    // @ts-ignore
    data.adminAddress = adminAddress;

    // const boxKey = algosdk.decodeAddress(callerAddress[0] as string).publicKey;
    
      const token = await typedClient.createAnAsset(
        {
          asaName: data.asaName,
          asaSymbol: data.asaSymbol
        },
        { sender, sendParams: { fee: new AlgoAmount({ algos: 0.02 }) }}
      );

      
    localStorage.setItem('voucherId', JSON.stringify(Number(token?.return)));

    setLoading(2)

      const asaIndex = Number(token?.return);
      const boxKey = algosdk.bigIntToBytes(asaIndex, 8);

      snack.default.success("Created ASA for the project")

       await typedClient.createProject(
        {
          _assetId: asaIndex,
          _project: [data.name, adminAddress[0] as string, [adminAddress[0] as string]]
        },
        { sender, 
          sendParams: { fee: new AlgoAmount({ algos: 0.02 }) },
          boxes: [{
            appIndex: 0,
            name: boxKey,
            }]
           }
      );
      snack.default.success("Adding project to contract")

      setLoading(3)

    // Needs refactor: Quick fix, need to refactor usePost()
    const res = await API.post(`${SERVER_URL}${URLS.PROJECT}`, {
      name: data.name,
      adminAddress: adminAddress,
      imageUrl: data.imageUrl,
      superAdmin: adminAddress[0]
    })

    postMutation({ urls: URLS.VOUCHER, data: {
      projectId: res?.data?.uuid,
      voucherName: data.asaName,
      voucherSymbol: data.asaSymbol,
      assetId: asaIndex.toString()
    } });

    setLoading(4)
  };

  useEffect(() => {
    if (isSuccess) {
      snack.default.success("Project created successfully");
      setShouldNavigate(true);
    } else if (isError) {
      snack.default.error("There was a problem with your request");
    }
  }, [isSuccess, isError]);

  if (shouldNavigate) {
    return <Navigate to="/admin/project" replace />;
  }

  return (
    <div className="h-screen flex justify-center">
      <SnackbarUtilsConfigurator />

      <div className="space-y-10 divide-y divide-gray-900/10 w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="text-white sm:rounded-xl md:col-span-3">
        {loading != 0 && <Stepper step={loading}/>}
        {loading != 0 && <div className='bg-green-200 p-2 text-sm text-green-800 border rounded mt-4 text-center'>
        {loading === 1 && 'Confirm in your wallet to create ASA for the project.'}  
        {loading === 2 && 'Confirm in your wallet to create project in our application.'}  
        {loading === 3 && 'All done, we are now updating our server.'}  
        </div>}

        </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`bg-gray-50 text-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3 ${loading != 0 && 'opacity-60'}`}
          >
            
            <div className="px-4 py-6 sm:p-8">
              <div className="px-4 sm:px-0">
                <h2 className=" font-semibold leading-7 text-2xl text-blue-900">Project Information</h2>
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
                      {...register("name")}
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter project name"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    Image URL
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("imageUrl")}
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      id="imageUrl"
                      className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    ASA Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("asaName")}
                      placeholder="Enter ASA Name"
                      type="text"
                      id="imageUrl"
                      className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.imageUrl && <p className="text-red-500">{errors.asaName?.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    ASA Symbol
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("asaSymbol")}
                      placeholder="AAA"
                      type="text"
                      min={3}
                      id="imageUrl"
                      className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.imageUrl && <p className="text-red-500">{errors.asaSymbol?.message}</p>}
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <Link to="/admin/project">Cancel</Link>
              </button>
              
              <button
                type="submit"
                disabled={loading != 0}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {loading === 0 ? 'Create' : 'Creating...'}
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
