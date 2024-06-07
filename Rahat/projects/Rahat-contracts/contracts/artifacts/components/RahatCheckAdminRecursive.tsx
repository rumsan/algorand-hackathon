/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatCheckAdminRecursive
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call checkAdminRecursive"
  typedClient={typedClient}
  admins={admins}
  address={address}
  index={index}
/>
*/
type RahatCheckAdminRecursiveArgs = Rahat['methods']['checkAdminRecursive(address[],address,uint64)bool']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  admins: RahatCheckAdminRecursiveArgs['admins']
  address: RahatCheckAdminRecursiveArgs['address']
  index: RahatCheckAdminRecursiveArgs['index']
}

const RahatCheckAdminRecursive = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling checkAdminRecursive`)
    await props.typedClient.checkAdminRecursive(
      {
        admins: props.admins,
        address: props.address,
        index: props.index,
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

export default RahatCheckAdminRecursive