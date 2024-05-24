import * as algosdk from 'algosdk';

export const generateRandomBeneficiaryAccount = () => {
    const account = algosdk.generateAccount();
    const mnemonics = algosdk.secretKeyToMnemonic(account.sk);
    const walletAddress = account?.addr;
    return {mnemonics, walletAddress};
}