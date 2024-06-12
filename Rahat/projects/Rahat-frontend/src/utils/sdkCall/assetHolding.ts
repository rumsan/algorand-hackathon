import { asaId } from "../asaId";
import { algodClient } from "../typedClient";

export const assetHoldinig = async (address:string) => {
    const accountInfo = await algodClient.accountInformation(address).do();
    //@ts-ignore
    return accountInfo['assets'].find(asset => asset['asset-id'] === Number(localStorage.getItem('voucherId')));
}