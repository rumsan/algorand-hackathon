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
import BeneficiaryDetailClawback from './pages/BeneficiaryDetail';
import BeneficiaryDetails from './pages/beneficiary/details';

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
              path="/admin/beneficiary/:id"
              element={
                <AdminRoute>
                  <BeneficiaryDetail />
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
              path="/admin/beneficiary/details"
              element={
                <AdminRoute>
                  <BeneficiaryDetailClawback />
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
          </Route>
          <Route
              path="/beneficiary/details"
              element={
                <AdminRoute>
                  <BeneficiaryDetails />
                </AdminRoute>
              }
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
