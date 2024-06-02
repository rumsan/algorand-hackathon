import React from 'react'
import RahatCreateAnAsset from '../components/contracts/RahatCreateAnAsset'
import { typedClient } from '../utils/typedClient'
import RahatAssignBeneficiary from '@/components/contracts/RahatAssignBeneficiary'

const CreateTokens = ({props}: any) => {
    
  return (
    <>
    <RahatCreateAnAsset
    buttonClass="btn m-2"
    buttonLoadingNode={<span className="loading loading-spinner" />}
    buttonNode="Call createAnAsset"
    typedClient={typedClient}
    />

    <RahatAssignBeneficiary
      buttonClass="btn m-2"
      buttonLoadingNode={<span className="loading loading-spinner" />}
      buttonNode="Call assignBeneficiary"
      typedClient={typedClient}
      _address={"VRTMUXHF6KYD4GWCFIISS5IKSUDMWM4CWTPHNIDMNRE6YJANLQNJ36OKAU"}
    />
    </>
  )
}

export default CreateTokens