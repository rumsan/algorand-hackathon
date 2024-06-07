/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<RahatSendAlgoToBeneficiaryForGasFee
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call sendAlgoToBeneficiaryForGasFee"
  typedClient={typedClient}
  benAddress={benAddress}
/>
*/
type RahatSendAlgoToBeneficiaryForGasFeeArgs = Rahat['methods']['sendAlgoToBeneficiaryForGasFee(address)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatSendAlgoToBeneficiaryForGasFeeArgs['benAddress']
}

const RahatSendAlgoToBeneficiaryForGasFee = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    await props.typedClient.sendAlgoToBeneficiaryForGasFee(
      {
        benAddress: props.benAddress,
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

export default RahatSendAlgoToBeneficiaryForGasFee