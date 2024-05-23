import { Contract } from '@algorandfoundation/tealscript';

export class Rahat extends Contract {
  // Token
  token = GlobalStateKey<AssetID>();

  beneficiaries = BoxMap<Address, uint64>({ prefix: 'beneficiary' });

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
   *
   * @returns Asset (token)
   */
  createAnAsset(): AssetID {
    verifyTxn(this.txn, { sender: this.app.creator });
    const asset = sendAssetCreation({
      configAssetTotal: 1_000_000_000_000_000,
      configAssetFreeze: this.app.address,
    });
    this.token.value = asset;
    return asset;
  }

  /**
   * A method to send tokens to beneficiary
   * @param benAddress Address of beneficiary to send token
   * @param amount Amount of token to send
   */
  sendTokenToBeneficiary(benAddress: Address, amount: uint64): void {
    assert(this.beneficiaries(benAddress).exists, 'Beneficiary is not assigned.');
    // Send asset to beneficiary
    sendAssetTransfer({
      xferAsset: this.token.value,
      assetReceiver: benAddress,
      assetAmount: amount,
    });

    // Update mapping
    this.beneficiaries(benAddress).value = amount;

    // Freeze their asset
    sendAssetFreeze({
      freezeAsset: this.token.value,
      freezeAssetAccount: benAddress,
      freezeAssetFrozen: true,
    });
  }

  /**
   * A method to unfreeze token
   * @param benAddress Address of beneficiary to unfreeze asset
   */
  unfreezeBeneficiaryAsset(benAddress: Address): void {
    sendAssetFreeze({
      freezeAsset: this.token.value,
      freezeAssetAccount: benAddress,
      freezeAssetFrozen: false,
    });
  }

  /**
   * A method to send tokens to vendors
   * @param venderAddress Address of vendor to receive tokens
   * @param amount Amount of token to send to vendor
   */
  sendTokenToVendor(venderAddress: Address, amount: uint64): void {
    // assert(this.beneficiaries(this.txn.sender).value > 0, "Beneficiary not assigned tokens");
    sendAssetTransfer({
      xferAsset: this.token.value,
      assetReceiver: venderAddress,
      assetAmount: amount,
    });
  }
}
