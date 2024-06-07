import React from 'react';
import RahatCreateAnAsset from '../components/contracts/RahatCreateAnAsset';
import { algodClient, typedClient } from '../utils/typedClient';
import RahatAssignBeneficiary from '@/components/contracts/RahatAssignBeneficiary';
import SideBar from '@/components/SideBar';
import * as algokit from '@algorandfoundation/algokit-utils';
import RahatCreateProject from '@/components/contracts/RahatCreateProject';

const CreateTokens = ({ props }: any) => {
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <SideBar />
        <div className="ml-64 w-full">
          <RahatCreateAnAsset
            buttonClass="btn m-2"
            buttonLoadingNode={<span className="loading loading-spinner" />}
            buttonNode="Call createAnAsset"
            typedClient={typedClient}
          />
                   
          <RahatCreateProject
            buttonClass="btn m-2"
            buttonLoadingNode={<span className="loading loading-spinner" />}
            buttonNode="Call createProject"
            typedClient={typedClient}
            _id={1}
            _project={["New project", "IG5TBV2UZTNKCBH2X43QCMIXY7YI374D3BHLQTGUVVB5D2XFRPAYIW5SUA"]}
          />
          
        </div>
      </div>
    </>
  );
};

export default CreateTokens;
