import React from 'react'
import RahatCreateAnAsset from '../components/contracts/RahatCreateAnAsset'
import { typedClient } from '../utils/typedClient'
import RahatAssignAdmin from '@/components/contracts/RahatAssignAdmin'

const CreateTokens = ({props}: any) => {
    
  return (
    <>
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
    </>
  )
}

export default CreateTokens