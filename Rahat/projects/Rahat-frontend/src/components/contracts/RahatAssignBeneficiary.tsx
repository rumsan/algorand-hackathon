/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage

*/
type RahatAssignBeneficiaryArgs = Rahat['methods']['assignBeneficiary(address)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  _address: RahatAssignBeneficiaryArgs['_address']
}

const RahatAssignBeneficiary = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const boxKey = new TextEncoder().encode('beneficiaries');

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling assignBeneficiary`)
    await props.typedClient.assignBeneficiary(
      {
        _address: props._address,
      },
      { sender,
        boxes: [
          {
          appIndex: Number(import.meta.env.VITE_APP_ID),
          name: boxKey,
          }
      ]
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

export default RahatAssignBeneficiary