import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { generateRandomBeneficiaryAccount } from '../utils/generateRandomBenAccount';
import InputWithLabels from '../reuseables/inputWithLabels';
import CreateBeneficiary from '../components/templates/create-beneficiary';
import SideBar from '@/components/SideBar';

const AddBeneficiary = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className=" ml-60 pl-60 pt-  ">
          <CreateBeneficiary />
        </div>
      </div>
    </>
  );
};

export default AddBeneficiary;
