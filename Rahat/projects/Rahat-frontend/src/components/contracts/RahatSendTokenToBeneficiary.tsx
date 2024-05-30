/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { algodClient } from '../../utils/typedClient'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

/* Example usage
<RahatSendTokenToBeneficiary
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call sendTokenToBeneficiary"
  typedClient={typedClient}
  benAddress={benAddress}
  amount={amount}
  assetId={assetId}
/>
*/
type RahatSendTokenToBeneficiaryArgs = Rahat['methods']['sendTokenToBeneficiary(address,uint64,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatSendTokenToBeneficiaryArgs['benAddress']
  amount: RahatSendTokenToBeneficiaryArgs['amount']
  assetId: RahatSendTokenToBeneficiaryArgs['assetId']
}

const RahatSendTokenToBeneficiary = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }
  const callMethod = async () => {
    
    setLoading(true)
    await props.typedClient.sendTokenToBeneficiary(
      {
        benAddress: props?.benAddress,
        amount: props?.amount,
        assetId: Number(import.meta.env.VITE_ASA_ID)
      },
      { sender,
        assets: [Number(import.meta.env.VITE_ASA_ID)],
        sendParams: {fee: new AlgoAmount({algos: 0.02})}
      },
    )
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {/* {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode} */}
      Send token to beneficiary
    </button>
  )
}

export default RahatSendTokenToBeneficiary