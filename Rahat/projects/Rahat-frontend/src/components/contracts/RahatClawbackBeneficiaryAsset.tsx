/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

type RahatClawbackBeneficiaryAssetArgs = Rahat['methods']['clawbackBeneficiaryAsset(address,uint64,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatClawbackBeneficiaryAssetArgs['benAddress']
  assetId: RahatClawbackBeneficiaryAssetArgs['assetId']
  amount: RahatClawbackBeneficiaryAssetArgs['amount']
}

const RahatClawbackBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling clawbackBeneficiaryAsset`)
    await props.typedClient.clawbackBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
        amount: props.amount,
      },
      { sender,
         assets: [Number(import.meta.env.VITE_ASA_ID)],
        accounts: [props.benAddress],
        sendParams: {fee: new AlgoAmount({algos: 0.003})} 
      },
    )
    setLoading(false)
  }

  return (
    <button type="submit" className="block px-3 py-1 text-sm leading-6 text-red-900" onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  );
}

export default RahatClawbackBeneficiaryAsset