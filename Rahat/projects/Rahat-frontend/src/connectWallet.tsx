import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';
import exp from 'constants';

function connectWallet () {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(true);

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };
  return (
    <div className=" flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {openWalletModal && <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />}
    </div>
  );
}

export default connectWallet;