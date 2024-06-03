/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatFreezeBeneficiaryAsset
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call freezeBeneficiaryAsset"
  typedClient={typedClient}
  benAddress={benAddress}
  assetId={assetId}
/>
*/
type RahatFreezeBeneficiaryAssetArgs = Rahat['methods']['freezeBeneficiaryAsset(address,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatFreezeBeneficiaryAssetArgs['benAddress']
  assetId: RahatFreezeBeneficiaryAssetArgs['assetId']
}

const RahatFreezeBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling freezeBeneficiaryAsset`)
    await props.typedClient.freezeBeneficiaryAsset(
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

export default RahatFreezeBeneficiaryAsset