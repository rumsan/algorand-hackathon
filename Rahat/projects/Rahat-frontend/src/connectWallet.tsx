import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';

function connectWallet () {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(true);

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };
  return (
    <div >
      {openWalletModal && <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />}
    </div>
  );
}

export default connectWallet;