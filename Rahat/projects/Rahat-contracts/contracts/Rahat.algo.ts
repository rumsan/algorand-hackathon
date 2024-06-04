import { Contract } from '@algorandfoundation/tealscript';
import * as algosdk from 'algosdk';

export class Rahat extends Contract {
  // Token
  token = GlobalStateKey<AssetID>();

  beneficiaries = BoxMap<Address, uint64>({});

  /**
   * A method to assign beneficiary to projects
   * @param _address Address
   *
   * @returns The result of the operation
   */
  assignBeneficiary(_address: Address): void {
    assert(!this.beneficiaries(_address).exists, 'Beneficiary already assigned to project');
    // Assign beneficiary to project
    this.beneficiaries(_address).value = 0;
  }

  /**
   * A method to create token
   *@param benAddress Address of beneficiary to send token
   @param benAddress Address of beneficiary to send token
   * @returns Asset (token)
   */
  createAnAsset(asaName: string, asaSymbol: string): AssetID {
    // verifyTxn(this.txn, { sender: this.app.creator });
    const asset = sendAssetCreation({
      configAssetTotal: 1_000_000_000_000_000,
      configAssetFreeze: this.app.address,
      configAssetName: asaName,
      configAssetUnitName: asaSymbol,
      configAssetClawback: this.app.address
    });

    this.token.value = asset;
    return asset;
  }


  /**
   * A method to send tokens to beneficiary
   * @param benAddress Address of beneficiary to send token
   * @param amount Amount of token to send
   * @param assetId: AssetID of token to be sent
   */
  sendTokenToBeneficiary(benAddress: Address, amount: uint64, assetId: AssetID): void {
    // Uncomment this line when box issue is fixed
    // assert(this.beneficiaries(benAddress).exists, 'Beneficiary is not assigned.');

    verifyTxn(this.txn, { sender: this.app.creator });

    // Send asset to beneficiary
    sendAssetTransfer({
      xferAsset: assetId,
      assetReceiver: benAddress,
      assetAmount: amount
    });

    // Update mapping
    // this.beneficiaries(benAddress).value = amount;

    // Freeze their asset
    sendAssetFreeze({
      freezeAsset: assetId,
      freezeAssetAccount: benAddress,
      freezeAssetFrozen: true,
    });
  }

  /**
   * A method to unfreeze token
   * @param benAddress Address of beneficiary to unfreeze asset
   */
  freezeBeneficiaryAsset(benAddress: Address, assetId: AssetID): void {
    sendAssetFreeze({
      freezeAsset: assetId,
      freezeAssetAccount: benAddress,
      freezeAssetFrozen: true,
    });
  }

  /**
   * A method to unfreeze token
   * @param benAddress Address of beneficiary to unfreeze asset
   */
  unfreezeBeneficiaryAsset(benAddress: Address, assetId: AssetID): void {

    // Check if transaction is signed by multisig address
    assert(this.txn.sender === addr('2WH45FYP7OGC5ZB5WKSEKLELLUKJ5FWLRXBUCZBYSGQYFSPHLD6D6USKPY'), "Not multisig address");

    sendAssetFreeze({
      freezeAsset: assetId,
      freezeAssetAccount: benAddress,
      freezeAssetFrozen: false,
    });
  }

  /**
   * A method to send tokens to vendors
   * @param venderAddress Address of vendor to receive tokens
   * @param amount Amount of token to send to vendor
   */
  sendTokenToVendor(venderAddress: Address, amount: uint64, assetId: AssetID): void {
    // assert(this.beneficiaries(this.txn.sender).value > 0, "Beneficiary not assigned tokens");
    sendAssetTransfer({
      xferAsset: assetId,
      assetReceiver: venderAddress,
      assetAmount: amount,
    });
  }

  /**
   * A method to clawback asset
   * @param benAddress Address of beneficiary to be clawbacked
   * @param assetId Asset id of asset
   * @param amount Amount, will be replace when box-issue is fixed
   */
  clawbackBeneficiaryAsset(benAddress: Address, assetId: AssetID, amount: uint64): void {

    // Use amount = total amount held by beneficiary when box-issue is fixed
    // const amount = this.beneficiaries(benAddress).value;

    // Unfreeze asset for beneficiary, incase needed to transfer later
    this.unfreezeBeneficiaryAsset(benAddress, assetId)

    if(true){

    }

    // Send clawback transaction
    sendAssetTransfer({
      xferAsset: assetId,
      assetSender: benAddress,
      assetReceiver: this.app.address,
      assetAmount: amount,
  });
  }


}
