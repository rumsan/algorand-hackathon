/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'

/* Example usage
*/
type RahatCreateProjectArgs = Rahat['methods']['createProject(uint64,(string,address))void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  _id: RahatCreateProjectArgs['_id']
  _project: RahatCreateProjectArgs['_project']
}

const RahatCreateProject = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling createProject`)
    const boxKey = algosdk.bigIntToBytes(123, 64)
    await props.typedClient.createProject(
      {
        _id: 123,
        _project: props._project,
      },
      { sender,
        boxes: [{
          appIndex: 0,
          name: boxKey,
          }]
       },
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