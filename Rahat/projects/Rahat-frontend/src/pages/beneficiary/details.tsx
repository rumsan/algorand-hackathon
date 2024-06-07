import { URLS } from '@/constants';
import useList from '@/hooks/useList';
import { PeraWalletConnect } from '@perawallet/connect';
import React, { useEffect } from 'react'

const BeneficiaryDetails = () => {
const peraWallet = new PeraWalletConnect({chainId: 416002});

const { data } = useList(`listProjectBeneficiary`, `${URLS.PROJECT}/${id}/beneficiaries`, 1, 5);

    const connectWallet = async () => {
        await peraWallet.connect()
    }

    useEffect(() => {
        connectWallet()
    }, [])


  return (
    <div>
      Projects you are enrolled in 
      
        
    </div>
  )
}

export default BeneficiaryDetails