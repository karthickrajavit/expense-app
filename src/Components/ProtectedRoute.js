import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure you're using Auth Context

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // Get user & loading state
  console.log(user, "user");
  if (loading) return <p>Loading...</p>; // Prevent flickering

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
