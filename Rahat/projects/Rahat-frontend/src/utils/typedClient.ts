import algosdk from 'algosdk'
import { RahatClient } from '../contracts/RahatClient'

export const algodClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "")

export const typedClient = new RahatClient({
  resolveBy: "id",
  id: Number(import.meta.env.VITE_APP_ID)
}, algodClient)