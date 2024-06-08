import React, { useEffect, useState } from 'react';
import RahatSendTokenToBeneficiary from '../components/contracts/RahatSendTokenToBeneficiary';
import { algodClient, typedClient } from '../utils/typedClient';
import { useParams } from 'react-router-dom';
import RahatUnfreezeBeneficiaryAsset from '@/components/contracts/RahatUnfreezeBeneficiaryAsset';
import RahatFreezeBeneficiaryAsset from '@/components/contracts/RahatFreezeBeneficiaryAsset';
import RahatClawbackBeneficiaryAsset from '@/components/contracts/RahatClawbackBeneficiaryAsset';

const BeneficiaryTransactASA = ({ walletAddress, assetStatus }: any) => {

  const amount = 1;

  return (
    <>
      <div className="  block justify-end  bg-gray-200 align-middle mt-4 space-x-2 ">
        {assetStatus.isCreated && !assetStatus.isFrozen && 
        <RahatSendTokenToBeneficiary
          buttonClass="btn"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Send Token"
          typedClient={typedClient}
          benAddress={walletAddress}
          amount={amount}
          assetId={Number(localStorage.getItem('voucherId'))}
        />
        }

        {assetStatus.isCreated && assetStatus.isFrozen && 
        <RahatUnfreezeBeneficiaryAsset
          buttonClass="btn"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Unfreeze Asset"
          typedClient={typedClient}
          benAddress={walletAddress}
          assetId={Number(localStorage.getItem('voucherId'))}
        />
        }

        {assetStatus.isCreated && !assetStatus.isFrozen && 
          <RahatFreezeBeneficiaryAsset
            buttonClass="btn"
            buttonLoadingNode={<span className="loading loading-spinner" />}
            buttonNode=" freeze Asset"
            typedClient={typedClient}
            benAddress={walletAddress}
            assetId={Number(localStorage.getItem('voucherId'))}
          />
        }

        {assetStatus.isCreated && assetStatus.amount > 0 && 
        <RahatClawbackBeneficiaryAsset
          buttonClass="btn"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Clawback"
          typedClient={typedClient}
          benAddress={walletAddress}
          assetId={Number(localStorage.getItem('voucherId'))}
          amount={1}
        />}
      </div>
    </>
  );
};

export default BeneficiaryTransactASA;
