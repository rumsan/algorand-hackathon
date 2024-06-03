import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import { PeraWalletConnect } from '@perawallet/connect';
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet';
import algosdk from 'algosdk';
import { SnackbarProvider } from 'notistack';
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

import './index.css';
import TanstackProvider from './providers/TanstackProvider';
import { SnackbarUtilsConfigurator } from './components/Toaster';

const ProvidersWrapper: React.FC = () => {
  let providersArray: ProvidersArray;
  if (import.meta.env.VITE_ALGOD_NETWORK === '') {
    const kmdConfig = getKmdConfigFromViteEnvironment();
    providersArray = [
      {
        id: PROVIDER_ID.KMD,
        clientOptions: {
          wallet: kmdConfig.wallet,
          password: kmdConfig.password,
          host: kmdConfig.server,
          token: String(kmdConfig.token),
          port: String(kmdConfig.port),
        },
      },
    ];
  } else {
    providersArray = [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS },
      // Additional providers can be added here
    ];
  }

  const algodConfig = getAlgodConfigFromViteEnvironment();

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  });

  return (
    <WalletProvider value={walletProviders}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </WalletProvider>
  );
};

// Render the React application
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnackbarUtilsConfigurator />
    <TanstackProvider>
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <ProvidersWrapper />
        </SnackbarProvider>
      </AuthProvider>
    </TanstackProvider>
  </React.StrictMode>
);
