import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Beneficiaries from './pages/Beneficiaries';
import ProjectList from './pages/project/ProjectList';

import Home from './Home';
import AdminLayout from './layout/AdminLayout';
import { AdminRoute } from './components/Routes';
import Dashboard from './pages/Dashboard';
import NavBar from './layout/Navbar';
import CreateTokens from './pages/CreateTokens';
import LoginPage from './pages/Login';
import AddBeneficiary from './pages/AddBeneficiary';
import Transaction from './pages/project/Transaction';
import ProjectDetail from './pages/project/ProjectDetail';
import ProjectBeneficiart from './pages/project/ProjectBeneficiary';
import ProjectBeneficiary from './pages/project/ProjectBeneficiary';

export default function App() {
  return (
    <div>
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
              path="/admin/project/beneficiary"
              element={
                <AdminRoute>
                  <ProjectBeneficiary />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/:id"
              element={
                <AdminRoute>
                  <ProjectDetail />
                </AdminRoute>
              }
            />
            {/* <Route
              path="/admin/project/add"
              element={
                <AdminRoute>
                  <AddProject />
                </AdminRoute>
              }
            /> */}
            <Route
              path="/admin/transactions"
              element={
                <AdminRoute>
                  <Transaction />
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
  );
}
