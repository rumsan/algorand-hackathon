import React from 'react'
import RahatCreateAnAsset from '../components/contracts/RahatCreateAnAsset'
import { typedClient } from '../utils/typedClient'
import RahatAssignBeneficiary from '@/components/contracts/RahatAssignBeneficiary'

const CreateTokens = () => {
    
  return (
    <>
    <div>CreateTokens</div>
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
      _address={"_address"}
    />
    </>
  )
}

export default CreateTokens