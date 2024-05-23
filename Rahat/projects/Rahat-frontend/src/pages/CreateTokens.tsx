import React from 'react'
import RahatCreateAnAsset from '../components/contracts/RahatCreateAnAsset'
import { typedClient } from '../utils/typedClient'

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
    </>
  )
}

export default CreateTokens