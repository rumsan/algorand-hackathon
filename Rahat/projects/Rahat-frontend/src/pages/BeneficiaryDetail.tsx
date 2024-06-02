import React, { useEffect, useState } from 'react'
import RahatSendTokenToBeneficiary from '../components/contracts/RahatSendTokenToBeneficiary'
import { algodClient, typedClient } from '../utils/typedClient'
import { useParams } from 'react-router-dom'
import RahatUnfreezeBeneficiaryAsset from '@/components/contracts/RahatUnfreezeBeneficiaryAsset'
import RahatFreezeBeneficiaryAsset from '@/components/contracts/RahatFreezeBeneficiaryAsset'
import RahatClawbackBeneficiaryAsset from '@/components/contracts/RahatClawbackBeneficiaryAsset'

const BeneficiaryDetail = () => {

  const [assetStatus, setassetStatus] = useState({ isFrozen: false, isCreated: true, amount: 0 })

  const beneficiaryWallet = "BQ63F7VH6FYQNFUK6YN6FGHI55FPE74FJT7EQ4NMBKHPT3QFSWJGXPPISA";
  const amount = 1;

  const tryasdf = "IG5TBV2UZTNKCBH2X43QCMIXY7YI374D3BHLQTGUVVB5D2XFRPAYIW5SUA";

  const checkAssetFrozenStatus = async () => {
    const accountInfo = await algodClient.accountInformation(beneficiaryWallet).do();
    console.log(accountInfo)
    //@ts-ignore
    const assetHolding = accountInfo['assets'].find(asset => asset['asset-id'] === Number(import.meta.env.VITE_ASA_ID));
    if (assetHolding) {
      setassetStatus({ isFrozen: assetHolding['is-frozen'], isCreated: true, amount: assetHolding['amount'] })
    }
    else {
      setassetStatus({ isFrozen: false, isCreated: false, amount: 0 })
    }
  }

  useEffect(() => {
    checkAssetFrozenStatus()
  }, [])


  return (
    <>
      <div>BeneficiaryDetail</div>

      Tokens held by beneficiary: {assetStatus.amount}
      {
        assetStatus.isCreated && 
        <>
          <h1>Send 1 asa to beneficiary</h1>
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
      }

      {
        assetStatus.isFrozen && 
        <>
          <h1>Unfreeze beneficiary asset</h1>
          <RahatUnfreezeBeneficiaryAsset
            buttonClass="btn m-2"
            buttonLoadingNode={<span className="loading loading-spinner" />}
            buttonNode="Call unfreezeBeneficiaryAsset"
            typedClient={typedClient}
            benAddress={beneficiaryWallet}
            assetId={Number(import.meta.env.VITE_ASA_ID)}
          />
          </>
      }

      {
        !assetStatus.isFrozen && <>
        <h1>Free beneficiary asset</h1>
        <RahatFreezeBeneficiaryAsset
          buttonClass="btn m-2"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Call freezeBeneficiaryAsset"
          typedClient={typedClient}
          benAddress={beneficiaryWallet}
          assetId={Number(import.meta.env.VITE_ASA_ID)}
        />
        </>
      }

      <RahatClawbackBeneficiaryAsset
        buttonClass="btn m-2"
        buttonLoadingNode={<span className="loading loading-spinner" />}
        buttonNode="Call clawbackBeneficiaryAsset"
        typedClient={typedClient}
        benAddress={beneficiaryWallet}
        assetId={Number(import.meta.env.VITE_ASA_ID)}
        amount={1}
      />


    </>

  )
}

export default BeneficiaryDetail