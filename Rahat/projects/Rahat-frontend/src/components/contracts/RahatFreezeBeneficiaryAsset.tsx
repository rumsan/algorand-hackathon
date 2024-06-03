/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

type RahatFreezeBeneficiaryAssetArgs = Rahat['methods']['freezeBeneficiaryAsset(address,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
  benAddress: RahatFreezeBeneficiaryAssetArgs['benAddress']
  assetId: RahatFreezeBeneficiaryAssetArgs['assetId']
}

const RahatFreezeBeneficiaryAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling freezeBeneficiaryAsset`)
    await props.typedClient.freezeBeneficiaryAsset(
      {
        benAddress: props.benAddress,
        assetId: props.assetId,
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
    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6" onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default RahatFreezeBeneficiaryAsset