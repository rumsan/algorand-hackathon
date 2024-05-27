/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { algodClient } from '../../utils/typedClient'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

/* Example usage
<RahatSendTokenToBeneficiary
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call sendTokenToBeneficiary"
  typedClient={typedClient}
  benAddress={benAddress}
  amount={amount}
  assetId={assetId}
/>
*/
type RahatSendTokenToBeneficiaryArgs = Rahat['methods']['sendTokenToBeneficiary(address,uint64,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatSendTokenToBeneficiaryArgs['benAddress']
  amount: RahatSendTokenToBeneficiaryArgs['amount']
  assetId: RahatSendTokenToBeneficiaryArgs['assetId']
}

const RahatSendTokenToBeneficiary = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const mnemonicsOfSender = 'announce ivory almost shine hotel stage final ordinary clay sing away make typical emotion slim cloud spray matrix story lobster bargain kidney also abandon hope'
  const walletOfSender = 'GXJCRWIOC2QHB2VHWZ3ABAKOZBISP32QBUY2FNHMZBQIU3GO3IU7NR2YY4'

  

  const callMethod = async () => {
    
    setLoading(true)
    await props.typedClient.sendTokenToBeneficiary(
      {
        benAddress: "BQ63F7VH6FYQNFUK6YN6FGHI55FPE74FJT7EQ4NMBKHPT3QFSWJGXPPISA",
        amount: 1,
        assetId: 672431347,
      },
      { sender, 
        sendParams: {fee: new AlgoAmount({algos: 0.02})}
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

export default RahatSendTokenToBeneficiary