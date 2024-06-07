/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatAddAdminToProject
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call addAdminToProject"
  typedClient={typedClient}
  _address={_address}
  _assetId={_assetId}
/>
*/
type RahatAddAdminToProjectArgs = Rahat['methods']['addAdminToProject(address,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  _address: RahatAddAdminToProjectArgs['_address']
  _assetId: RahatAddAdminToProjectArgs['_assetId']
}

const RahatAddAdminToProject = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling addAdminToProject`)
    await props.typedClient.addAdminToProject(
      {
        _address: props._address,
        _assetId: props._assetId,
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

export default RahatAddAdminToProject