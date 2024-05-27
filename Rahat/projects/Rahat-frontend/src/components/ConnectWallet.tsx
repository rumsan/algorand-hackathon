import { useAuth } from "../context/AuthContext";
import { Provider, useWallet } from "@txnlab/use-wallet";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ConnectWallet = () => {
  const { providers, activeAddress } = useWallet();
  const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation();

  const navigate = useNavigate(); // Hook for navigation

  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === "kmd";

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     login(); // You should replace this with actual logic to check wallet connection status
  //   }
  // }, [isAuthenticated, login]);

  useEffect(() => {
    if (activeAddress) {
      login();
      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    }
  }, [activeAddress, login, navigate, location.state]);

  const handleLogout = async () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive);
      if (activeProvider) {
        await activeProvider.disconnect();
      }
    }
    logout();
    navigate("/", { replace: true });
    // This ensures that the application state is reset
  };

  return (
    <form method="dialog" className=" text-black p-8 border rounded-md bg-white">
      <p className="font-bold text-2xl mb-6 text-center">{isAuthenticated ? "Are  you sure" : "Connect wallet"} </p>
      <p className="text-sm text-gray-500 text-center mb-3">
        Connect through your wallet provider or <strong className="text-blue-300">Create Wallet</strong> if you don't have one
      </p>

      <div className="grid gap-6">
        {/* {activeAddress && (
            <>
              <Navigate replace to="/admin/dashboard" />
              <div className="border-b border-gray-600 my-4" />
            </>
          )} */}

        {!activeAddress &&
          providers?.map((provider) => (
            <button
              data-test-id={`${provider.metadata.id}-connect`}
              className="btn border text-black flex items-center space-x-3 py-4 px-4 rounded-lg"
              key={`provider-${provider.metadata.id}`}
              onClick={async () => {
                return provider.connect();
              }}
            >
              {!isKmd(provider) && <img alt={`wallet_icon_${provider.metadata.id}`} src={provider.metadata.icon} className="w-6 h-6" />}
              <span>{isKmd(provider) ? "LocalNet Wallet" : provider.metadata.name}</span>
            </button>
          ))}
      </div>

      <div className="modal-action flex justify-end space-x-4 mt-8">
        {activeAddress && (
          <button
            className="btn  text-white py-2 px-4 rounded-lg"
            data-test-id="logout"
            onClick={handleLogout}
            // onClick={async () => {
            //   if (providers) {
            //     const activeProvider = providers.find((p) => p.isActive);
            //     if (activeProvider) {
            //       activeProvider.disconnect();
            //     } else {
            //       localStorage.removeItem('txnlab-use-wallet');
            //       logout();
            //       navigate('/', { replace: true });
            //       window.location.reload();
            //     }
            //   }
            // }}
          >
            Logout
          </button>
        )}
      </div>
    </form>
  );
};
export default ConnectWallet;
