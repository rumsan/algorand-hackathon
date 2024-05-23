// import { DeflyWalletConnect } from '@blockshake/defly-connect'
// import { DaffiWalletConnect } from '@daffiwallet/connect'
// import { PeraWalletConnect } from '@perawallet/connect'
// import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
// import algosdk from 'algosdk'
// import { SnackbarProvider } from 'notistack'
// import Home from './Home'
// import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Beneficiaries from "./components/templates/Beneficiaries";
import NavBar from "./components/templates/Navbar";
import ProjectList from "./components/templates/ProjectList";

// let providersArray: ProvidersArray
// if (import.meta.env.VITE_ALGOD_NETWORK === '') {
//   const kmdConfig = getKmdConfigFromViteEnvironment()
//   providersArray = [
//     {
//       id: PROVIDER_ID.KMD,
//       clientOptions: {
//         wallet: kmdConfig.wallet,
//         password: kmdConfig.password,
//         host: kmdConfig.server,
//         token: String(kmdConfig.token),
//         port: String(kmdConfig.port),
//       },
//     },
//   ]
// } else {
//   providersArray = [
//     { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
//     { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
//     { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
//     { id: PROVIDER_ID.EXODUS },
//     // If you are interested in WalletConnect v2 provider
//     // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
//   ]
// }

// export default function App() {
//   const algodConfig = getAlgodConfigFromViteEnvironment()

//   const walletProviders = useInitializeProviders({
//     providers: providersArray,
//     nodeConfig: {
//       network: algodConfig.network,
//       nodeServer: algodConfig.server,
//       nodePort: String(algodConfig.port),
//       nodeToken: String(algodConfig.token),
//     },
//     algosdkStatic: algosdk,
//   })

//   return (
//     <SnackbarProvider maxSnack={3}>
//       <WalletProvider value={walletProviders}>
//         <Home />
//       </WalletProvider>
//     </SnackbarProvider>
//   )
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/projects",
        element: <ProjectList />,
      },
      {
        path: "/beneficiaries",
        element: <Beneficiaries />,
      },
      {
        path: "/bye",
        element: <h1>Bye</h1>,
      },
    ],
  },
]);
export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
