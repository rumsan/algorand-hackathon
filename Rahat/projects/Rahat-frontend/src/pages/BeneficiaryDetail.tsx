import React from 'react'
import RahatSendTokenToBeneficiary from '../components/contracts/RahatSendTokenToBeneficiary'
import { typedClient } from '../utils/typedClient'

const BeneficiaryDetail = () => {
  return (
    <>
    <div>BeneficiaryDetail</div>
    

    <RahatSendTokenToBeneficiary
    buttonClass="btn m-2"
    buttonLoadingNode={<span className="loading loading-spinner" />}
    buttonNode="Call sendTokenToBeneficiary"
    typedClient={typedClient}
    benAddress={"IG5TBV2UZTNKCBH2X43QCMIXY7YI374D3BHLQTGUVVB5D2XFRPAYIW5SUA"}
    amount={10}
    assetId={671526136}
    />

</>

  )
}

export default BeneficiaryDetail