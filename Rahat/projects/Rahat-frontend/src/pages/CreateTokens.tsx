import React from 'react';
import RahatCreateAnAsset from '../components/contracts/RahatCreateAnAsset';
import { typedClient } from '../utils/typedClient';
import RahatAssignBeneficiary from '@/components/contracts/RahatAssignBeneficiary';
import SideBar from '@/components/SideBar';
import RahatAssignAdmin from '@/components/contracts/RahatAssignBeneficiary';

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

          <RahatAssignAdmin
            buttonClass="btn m-2"
            buttonLoadingNode={<span className="loading loading-spinner" />}
            buttonNode="Call assignAdmin"
            typedClient={typedClient}
            _address={"_address"}
          />
          
        </div>
      </div>
    </>
  );
};

export default CreateTokens;
