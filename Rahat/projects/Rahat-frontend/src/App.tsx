import TokenDetail from './pages/project/TokenDetail';
import AdminLayout from './layout/AdminLayout';
import { AdminRoute } from './components/Routes';
import Dashboard from './pages/Dashboard';
import CreateTokens from './pages/CreateTokens';
import LoginPage from './pages/Login';
import AddBeneficiary from './pages/AddBeneficiary';
import Transaction from './pages/project/Transaction';
import ProjectDetail from './pages/project/ProjectDetail';
import ProjectBeneficiary from './pages/project/ProjectBeneficiary';
import AddProject from './pages/project/AddProject';
import BeneficiaryDetail from './pages/project/BeneficiaryDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/project/ProjectList';
import Beneficiaries from './pages/Beneficiaries';
import AddAdmin from './pages/project/AddAdmin';
import Clawback from './pages/project/Clawback';
import BeneficiaryDetails from './pages/beneficiary/details';
import InviteTeamMembers from './components/AddTeamMembers';
import CreateVendor from './pages/project/CreateVendor';
import VendorDetail from './pages/project/VendorDetail';
import UtilizeAsa from './pages/beneficiary/UtilizeAsa';

export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/invite-member"
              element={
                <AdminRoute>
                  <InviteTeamMembers />
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
              path="/admin/project/:id"
              element={
                <AdminRoute>
                  <ProjectDetail />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/addAdmin"
              element={
                <AdminRoute>
                  <AddAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/add"
              element={
                <AdminRoute>
                  <AddProject />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/beneficiary"
              element={
                <AdminRoute>
                  <ProjectBeneficiary />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/add-beneficiary"
              element={
                <AdminRoute>
                  <AddBeneficiary />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/project/:id/transactions"
              element={
                <AdminRoute>
                  <Transaction />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/beneficiary/:id"
              element={
                <AdminRoute>
                  <BeneficiaryDetail />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/create-asa"
              element={
                <AdminRoute>
                  <CreateTokens />
                </AdminRoute>
              }
            />
            {/* <Route
              path="/admin/beneficiary"
              element={
                <AdminRoute>
                  <Beneficiaries />
                </AdminRoute>
              }
            /> */}
            <Route
              path="/admin/createToken"
              element={
                <AdminRoute>
                  <CreateTokens />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/project/:projectId/beneficiary/clawback"
              element={
                <AdminRoute>
                  <Clawback />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/token-detail"
              element={
                <AdminRoute>
                  <TokenDetail />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/create-vendor"
              element={
                <AdminRoute>
                  <CreateVendor />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/project/:id/vendor"
              element={
                <AdminRoute>
                  <VendorDetail />
                </AdminRoute>
              }
            />
          </Route>

          {/* Real beneficiary route */}
          <Route path="/beneficiary" element={<AdminLayout />}>
            <Route
              path="/beneficiary/details/:id"
              element={
                <AdminRoute>
                  <BeneficiaryDetails />
                </AdminRoute>
              }
            />

            <Route
              path="/beneficiary/utilize-asa/:id"
              element={
                <AdminRoute>
                  <UtilizeAsa />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
