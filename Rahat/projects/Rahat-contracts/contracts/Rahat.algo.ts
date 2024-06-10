import { Contract, asset_transfer } from '@algorandfoundation/tealscript';

type projectType = {
  name: string,
  superAdmin: Address,
  admins: Address[]
}

export class Rahat extends Contract {

  project = BoxMap<AssetID, projectType>({});

  /**
   * A method to create a project
   * @param _id Unique address of project
   * @param _project Project type
   * @returns Void
   */
  createProject(_assetId:AssetID, _project: projectType):void{
    this.project(_assetId).value = _project
  }

  /**
   * A method to assign beneficiary to projects
   * @param _address Address of admin to be assigned
   * @returns The result of the operation
   */
  addAdminToProject(_address: Address, _assetId: AssetID): void{
    assert(this.project(_assetId).value.superAdmin === this.txn.sender, "Only super admin can assign admin")
    this.project(_assetId).value.admins = [_address];
  }

  /**
   * A method to get project
   * @param _assetId Address of project to get
   * @returns Project details 
   */
  getProject(_assetId: AssetID): projectType {
      return this.project(_assetId).value;
  }

  /**
   * A method to create token
   *@param asaName Address of beneficiary to send token
   *@param asaSymbol Address of beneficiary to send token
   *@param _name Address of beneficiary to send token
   *@returns Asset (token)
   */
  createAnAsset(asaName: string, asaSymbol: string): AssetID {
    const asset = sendAssetCreation({
      configAssetTotal: 1_000_000_000_000_000,
      configAssetFreeze: this.app.address,
      configAssetName: asaName,
      configAssetUnitName: asaSymbol,
      configAssetClawback: this.app.address
    });
    return asset;
  }


  /**
   * A method to send tokens to beneficiary
   * @param benAddress Address of beneficiary to send token
   * @param amount Amount of token to send
   * @param assetId: AssetID of token to be sent
   */
  sendTokenToBeneficiary(benAddress: Address, amount: uint64, assetId: AssetID): void {

    const projectAdmins = this.project(assetId).value.admins;
    const isAdmin = this.checkAdminRecursive(projectAdmins, this.txn.sender, 0);
    assert(isAdmin, "Not an admin");

    // Send asset to beneficiary
    sendAssetTransfer({
      xferAsset: assetId,
      assetReceiver: benAddress,
      assetAmount: amount
    });

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
    
    const projectAdmins = this.project(assetId).value.admins;
    const isAdmin = this.checkAdminRecursive(projectAdmins, this.txn.sender, 0)
    assert(isAdmin, "Not an admin")

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
    
    const projectAdmins = this.project(assetId).value.admins;
    const isAdmin = this.checkAdminRecursive(projectAdmins, this.txn.sender, 0)
    assert(isAdmin, "Not an admin")

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
    sendAssetTransfer({
      sender: venderAddress,
      xferAsset: assetId,
      assetReceiver: this.txn.sender,
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

    const projectAdmins = this.project(assetId).value.admins;
    const isAdmin = this.checkAdminRecursive(projectAdmins, this.txn.sender, 0)
    assert(isAdmin, "Not an admin")

    // Unfreeze asset for beneficiary, incase we need to transfer later
    this.unfreezeBeneficiaryAsset(benAddress, assetId)

    // Send clawback transaction
    sendAssetTransfer({
      xferAsset: assetId,
      assetSender: benAddress,
      assetReceiver: this.app.address,
      assetAmount: amount,
    });
  }

  checkAdminRecursive(admins: Address[], address: Address, index: uint64): boolean {
    if (index >= admins.length) {
      return false;
    }
    if (admins[index] == address) {
      return true;
    }
    return this.checkAdminRecursive(admins, address, index + 1);
  }

}
