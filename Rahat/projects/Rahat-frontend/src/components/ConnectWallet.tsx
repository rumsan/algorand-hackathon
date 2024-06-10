import { useAuth } from "../context/AuthContext";
import { Provider, useWallet } from "@txnlab/use-wallet";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ConnectWallet = () => {
  const { providers, activeAddress } = useWallet();
  const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate(); // Hook for navigation

  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === "kmd";

  useEffect(() => {
    if (activeAddress) {
      login();
      enqueueSnackbar(`You have been successfully logged in.`, { variant: "success" });
      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    }
  }, [activeAddress, login, navigate, location.state]);

  const handleLogout = async () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive);
      if (activeProvider) {
        await activeProvider.disconnect();
        enqueueSnackbar(`You have been logged out.`, { variant: "success" });
      }
    }
    logout();
    enqueueSnackbar(`You have been logged out.`, { variant: "success" });
    navigate("/", { replace: true });
  };

  return (
    <form method="dialog" className=" text-black p-8 border rounded-md bg-white">
      <p className="font-bold text-2xl mb-6 text-center">{isAuthenticated ? "Are  you sure" : "Connect wallet"} </p>
      <p className="text-sm text-gray-500 text-center mb-3">
        Connect through your wallet provider or <strong className="text-blue-300">Create Wallet</strong> if you don't have one
      </p>

      <div className="grid gap-6">
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
          <button className="btn  text-white py-2 px-4 rounded-lg" data-test-id="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </form>
  );
};
export default ConnectWallet;
