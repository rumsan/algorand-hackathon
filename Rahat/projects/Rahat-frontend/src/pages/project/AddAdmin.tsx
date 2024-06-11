import SideBar from "../../components/SideBar";
import { Link, useParams, Navigate } from "react-router-dom";
import { typedClient } from "@/utils/typedClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SnackbarUtilsConfigurator } from "../../components/Toaster";
import * as snack from "../../components/Toaster";
import addAdminSchema from "@/validation/addAdminSchema";
import { useForm } from "react-hook-form";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { useEffect, useState } from "react";
import { asaId } from "@/utils/asaId";
import usePost from "@/hooks/usePost";
import { URLS } from "@/constants";

type AdminType = z.infer<typeof addAdminSchema> & { activeAddress?: string };

export default function addAdmin() {
  const { id } = useParams();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { postMutation, data, isError, isSuccess } = usePost("addAdmin");
  const [projectDetails, setProjectDetails] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: {
      adminIds: "",
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

      console.log("This returns", res?.return);
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
    postMutation({ urls: `${URLS.PROJECT}/${id}` + "/addAdmins", data });
  };

  const people = [
    {
      name: "Lindsay Walton",
      role: "Front-end Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Courtney Henry",
      role: "Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Tom Cook",
      role: "Director of Product",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

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
      snack.default.success("Admin added successfully");
      setShouldNavigate(true);
    } else if (isError) {
      snack.default.error("There was a problem with your request");
    }
  }, [isSuccess, isError]);

  const route = `/admin/project/${id}`;
  if (shouldNavigate) {
    return <Navigate to={route} replace />;
  }
  return (
    <>
      <div className="flex">
        <SideBar />

        {/* Main Content */}
        <div className="pl-52 pt-16 w-full flex justify-center">
          <SnackbarUtilsConfigurator />

          <div className="space-y-10 divide-y divide-gray-900/10 w-full max-w-4xl px-4 pb-80">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <form onSubmit={handleSubmit(onSubmit)} className=" text-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
                <div className="px-4 py-6 sm:p-8">
                  <div className="px-4 sm:px-0 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">Invite Admin</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven’t added any admin members to your project yet. As the owner of this project, you can manage team member
                      permissions.
                    </p>
                  </div>
                  <br />

                  <div className="flex mt-2">
                    <input
                      {...register("adminIds")}
                      type="text"
                      id="name"
                      placeholder="Enter admins wallet address ..."
                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      className="ml-4 flex-shrink-0 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Send invite
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
