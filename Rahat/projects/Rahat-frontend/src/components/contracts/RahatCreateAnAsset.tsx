/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Rahat, RahatClient } from '../../contracts/RahatClient'
import { useWallet } from '@txnlab/use-wallet'
import InputWithLabels from '../../reuseables/inputWithLabels'
import algosdk from 'algosdk'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
import axios from 'axios'
import { algodClient } from '@/utils/typedClient'
import { PeraWalletConnect } from '@perawallet/connect';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels'

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: RahatClient
}

const RahatCreateAnAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const createVoucher = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const payload = {
      voucherName: e.target['voucherName'].value,
      voucherSymbol: e.target['voucherSymbol'].value
    }

    const res = await axios.get(`http://localhost:5500/api/v1/vouchers/${payload.voucherSymbol}`)

    if(!res?.data?.uuid){
      const algoResponse = await props.typedClient.createAnAsset(
        {
        asaName: e.target['asaName'].value,
        asaSymbol: e.target['asaSymbol'].value,
        },
        { sender, 
          sendParams: {fee: new AlgoAmount({algos: 0.02})}
        },
      )
      const assetId = Number(algoResponse?.return).toString()
      if(assetId){
      await axios.post('http://localhost:5500/api/v1/vouchers', {...payload, assetId})
      }
    }
  }

  return (

    <>
    <form onSubmit={(e) => createVoucher(e)}>
    <h2 className="text-base font-semibold leading-7 text-gray-900">Create an ASA for a project</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">ASA name</label>
          <div className="mt-2">
            <input type="text" name="asaName" id="voucherName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">ASA Symbol</label>
          <div className="mt-2">
            <input type="text" name="asaSymbol" id="voucherSymbol"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
          </div>
        </div>
    </div>
      <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6">
      {/* {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode} */}
      Create
      </button>
    </form>
    </>
  )
}

export default RahatCreateAnAsset