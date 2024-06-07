/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

type RahatAssignAdminArgs = Rahat['methods']['assignAdmin(string)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  _address: RahatAssignAdminArgs['_address']
}

const RahatAssignAdmin = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling assignAdmin`)
    await props.typedClient.assignAdmin(
      {
        _address: props._address,
      },
      { sender,
        sendParams: {fee: new AlgoAmount({algos: 0.003})},
        boxes: []
       },
    )
    setLoading(false)
  }

  return (
    <>
    </>
    // <button className={props.buttonClass} onClick={callMethod}>
    //   Assign admin
    // </button>
  )
}

export default RahatAssignAdmin