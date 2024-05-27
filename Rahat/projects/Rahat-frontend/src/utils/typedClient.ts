import algosdk from 'algosdk'
import { RahatClient } from '../contracts/RahatClient'

export const algodClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "")

export const typedClient = new RahatClient({
  resolveBy: "id",
  id: 672429119
}, algodClient)