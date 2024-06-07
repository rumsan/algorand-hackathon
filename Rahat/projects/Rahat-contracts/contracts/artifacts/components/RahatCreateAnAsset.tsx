/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatCreateAnAsset
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call createAnAsset"
  typedClient={typedClient}
  asaName={asaName}
  asaSymbol={asaSymbol}
/>
*/
type RahatCreateAnAssetArgs = Rahat['methods']['createAnAsset(string,string)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  asaName: RahatCreateAnAssetArgs['asaName']
  asaSymbol: RahatCreateAnAssetArgs['asaSymbol']
}

const RahatCreateAnAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling createAnAsset`)
    await props.typedClient.createAnAsset(
      {
        asaName: props.asaName,
        asaSymbol: props.asaSymbol,
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

export default RahatCreateAnAsset