import { useWallet } from '@txnlab/use-wallet';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
   const { isAuthenticated } = useAuth();
   const location = useLocation();

   if (!isAuthenticated) {
     return <Navigate to="/" state={{ from: location }} replace />;
   }

   return children;
};
