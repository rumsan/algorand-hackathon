
import {QRCodeSVG} from 'qrcode.react';
import { useState } from 'react';
import { generateRandomBeneficiaryAccount } from '../utils/generateRandomBenAccount';
import InputWithLabels from '../reuseables/inputWithLabels';
import CreateBeneficiary from '../components/templates/create-beneficiary';

const AddBeneficiary = () => {

  return (
    <>
    <CreateBeneficiary />
    </>
  )
}

export default AddBeneficiary