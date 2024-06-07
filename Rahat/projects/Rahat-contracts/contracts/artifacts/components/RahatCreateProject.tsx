/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatCreateProject
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call createProject"
  typedClient={typedClient}
  _assetId={_assetId}
  _project={_project}
/>
*/
type RahatCreateProjectArgs = Rahat['methods']['createProject(uint64,(string,address,address[]))void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  _assetId: RahatCreateProjectArgs['_assetId']
  _project: RahatCreateProjectArgs['_project']
}

const RahatCreateProject = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling createProject`)
    await props.typedClient.createProject(
      {
        _assetId: props._assetId,
        _project: props._project,
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

export default RahatCreateProject