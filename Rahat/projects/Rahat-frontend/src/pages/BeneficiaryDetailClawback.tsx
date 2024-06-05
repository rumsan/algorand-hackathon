import React, { useEffect, useState } from 'react';
import RahatSendTokenToBeneficiary from '../components/contracts/RahatSendTokenToBeneficiary';
import { algodClient, typedClient } from '../utils/typedClient';
import { useParams } from 'react-router-dom';
import RahatUnfreezeBeneficiaryAsset from '@/components/contracts/RahatUnfreezeBeneficiaryAsset';
import RahatFreezeBeneficiaryAsset from '@/components/contracts/RahatFreezeBeneficiaryAsset';
import RahatClawbackBeneficiaryAsset from '@/components/contracts/RahatClawbackBeneficiaryAsset';

const BeneficiaryDetailClawback = ({ walletAddress }: { walletAddress: string }) => {
  const [assetStatus, setassetStatus] = useState({ isFrozen: false, isCreated: true, amount: 0 });

  const amount = 1;

  const checkAssetFrozenStatus = async () => {
    const accountInfo = await algodClient.accountInformation(walletAddress).do();
    console.log(accountInfo);
    //@ts-ignore
    const assetHolding = accountInfo['assets'].find((asset) => asset['asset-id'] === Number(import.meta.env.VITE_ASA_ID));
    if (assetHolding) {
      setassetStatus({ isFrozen: assetHolding['is-frozen'], isCreated: true, amount: assetHolding['amount'] });
    } else {
      setassetStatus({ isFrozen: false, isCreated: false, amount: 0 });
    }
  };

  useEffect(() => {
    checkAssetFrozenStatus();
  }, []);

  return (
    <>
      <div className="  block justify-end  bg-gray-200 align-middle mt-4 space-x-2 ">
        {/* {assetStatus.isCreated && ( */}
        <RahatSendTokenToBeneficiary
          buttonClass="btn"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Send Token"
          typedClient={typedClient}
          benAddress={walletAddress}
          amount={amount}
          assetId={Number(import.meta.env.VITE_ASA_ID)}
        />
        {/* )} */}

        {/* {assetStatus.isFrozen && ( */}
        <RahatUnfreezeBeneficiaryAsset
          buttonClass="btn"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Unfreeze Asset"
          typedClient={typedClient}
          benAddress={walletAddress}
          assetId={Number(localStorage.getItem('voucherId'))}
        />
        {/* )} */}

        {!assetStatus.isFrozen && (
          <RahatFreezeBeneficiaryAsset
            buttonClass="btn"
            buttonLoadingNode={<span className="loading loading-spinner" />}
            buttonNode=" freeze Asset"
            typedClient={typedClient}
            benAddress={walletAddress}
            assetId={Number(localStorage.getItem('voucherId'))}
          />
        )}

        <RahatClawbackBeneficiaryAsset
          buttonClass="btn"
          buttonLoadingNode={<span className="loading loading-spinner" />}
          buttonNode="Clawback"
          typedClient={typedClient}
          benAddress={walletAddress}
          assetId={Number(localStorage.getItem('voucherId'))}
          amount={1}
        />
      </div>
    </>
  );
};

export default BeneficiaryDetailClawback;
