import { Contract } from '@algorandfoundation/tealscript';
import { verifyMultisig } from 'algosdk';

export class Rahat extends Contract {
 
  beneficiaries = BoxMap<Address, uint64>({ prefix: 'beneficiary' });

  token = GlobalStateKey<AssetID>() 

  multisigParams = {
    version: 1,
    threshold: 2,
    addrs: [
      "ADDRESS1",
      "ADDRESS2",
      "ADDRESS3"
    ]
  };

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
    verifyTxn(this.txn, { sender: this.app.creator });
    const asset = sendAssetCreation({
      configAssetTotal: 1_000_000_000_000_000,
      configAssetFreeze: this.app.address,
      configAssetName: asaName,
      configAssetUnitName: asaSymbol
    });

    this.token.value = asset;
    return asset;
  }


  /**
   * A method to send tokens to beneficiary
   * @param benAddress Address of beneficiary to send token
   * @param amount Amount of token to send
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
  unfreezeBeneficiaryAsset(benAddress: Address, assetId: AssetID): void {
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
}
