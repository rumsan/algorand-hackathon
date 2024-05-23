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

import Home from "./Home";
import AdminLayout from "./layout/AdminLayout";
import { AdminRoute } from "./components/Routes";
import Dashboard from "./pages/Dashboard";
import NavBar from "./layout/Navbar";
import LoginPage from "./pages/Login";

export default function App() {
  return (
    <div>
      <LoginPage />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /

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
            /> */}
      {/* <Route
              path="/admin/project/add"
              element={
                <AdminRoute>
                  <AddProject />
                </AdminRoute>
              }
            /> */}
      {/* <Route
              path="/admin/transaction"
              element={
                <AdminRoute>
                  <Transaction />
                </AdminRoute>
              }
            /> */}
      {/* <Route
              path="/admin/beneficiary"
              element={
                <AdminRoute>
                  <Beneficiaries />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}
