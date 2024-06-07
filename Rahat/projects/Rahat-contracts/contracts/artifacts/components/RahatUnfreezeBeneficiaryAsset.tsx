/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatUnfreezeBeneficiaryAsset
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call unfreezeBeneficiaryAsset"
  typedClient={typedClient}
  benAddress={benAddress}
  assetId={assetId}
/>
*/
type RahatUnfreezeBeneficiaryAssetArgs = Rahat['methods']['unfreezeBeneficiaryAsset(address,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatUnfreezeBeneficiaryAssetArgs['benAddress']
  assetId: RahatUnfreezeBeneficiaryAssetArgs['assetId']
}

const RahatUnfreezeBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling unfreezeBeneficiaryAsset`)
    await props.typedClient.unfreezeBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
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

export default RahatUnfreezeBeneficiaryAsset