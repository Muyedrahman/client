import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  
  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  if (user && role === "admin") {
    return children;
  }


  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
                            