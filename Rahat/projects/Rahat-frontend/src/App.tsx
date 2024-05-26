// import { DeflyWalletConnect } from '@blockshake/defly-connect'
// import { DaffiWalletConnect } from '@daffiwallet/connect'
// import { PeraWalletConnect } from '@perawallet/connect'
// import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
// import algosdk from 'algosdk'
// import { SnackbarProvider } from 'notistack'
// import Home from './Home'
// import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beneficiaries from "./pages/Beneficiaries";
import ProjectList from "./pages/ProjectList";

import Home from './Home';
import AdminLayout from './layout/AdminLayout';
import { AdminRoute } from './components/Routes';
import Dashboard from './pages/Dashboard';
import NavBar from './layout/Navbar';
import CreateTokens from './pages/CreateTokens';
import LoginPage from "./pages/Login";
import AddBeneficiary from "./pages/AddBeneficiary";
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/admin" element={<NavBar />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project"
              element={
                <AdminRoute>
                  <ProjectList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/beneficiary"
              element={
                <AdminRoute>
                  <Beneficiaries />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/createToken"
              element={
                <AdminRoute>
                  <CreateTokens />
                </AdminRoute>
              }
            />

          <Route
              path="/admin/add-beneficiary"
              element={
                <AdminRoute>
                  <AddBeneficiary />
                </AdminRoute>
              }
            />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}
