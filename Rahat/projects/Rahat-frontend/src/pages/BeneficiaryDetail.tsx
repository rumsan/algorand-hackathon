import React from 'react'
import RahatSendTokenToBeneficiary from '../components/contracts/RahatSendTokenToBeneficiary'
import { typedClient } from '../utils/typedClient'
import { useParams } from 'react-router-dom'

const BeneficiaryDetail = () => {

  const beneficiaryWallet = "IG5TBV2UZTNKCBH2X43QCMIXY7YI374D3BHLQTGUVVB5D2XFRPAYIW5SUA";
  const amount = 1;

  return (
    <>
    <div>BeneficiaryDetail</div>

    <RahatSendTokenToBeneficiary
    buttonClass="btn m-2"
    buttonLoadingNode={<span className="loading loading-spinner" />}
    buttonNode="Call sendTokenToBeneficiary"
    typedClient={typedClient}
    benAddress={beneficiaryWallet}
    amount={amount}
    assetId={Number(import.meta.env.VITE_ASA_ID)}
    />

</>

  )
}

export default BeneficiaryDetail