/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatClawbackBeneficiaryAsset
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call clawbackBeneficiaryAsset"
  typedClient={typedClient}
  benAddress={benAddress}
  assetId={assetId}
  amount={amount}
/>
*/
type RahatClawbackBeneficiaryAssetArgs = Rahat['methods']['clawbackBeneficiaryAsset(address,uint64,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatClawbackBeneficiaryAssetArgs['benAddress']
  assetId: RahatClawbackBeneficiaryAssetArgs['assetId']
  amount: RahatClawbackBeneficiaryAssetArgs['amount']
}

const RahatClawbackBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling clawbackBeneficiaryAsset`)
    await props.typedClient.clawbackBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
        amount: props.amount,
      },
      { sender },
    )
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default RahatClawbackBeneficiaryAsset