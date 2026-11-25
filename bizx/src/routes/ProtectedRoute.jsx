import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <Outlet />   {/* page renders here */}
      <Footer />
    </>
  );
};

export default ProtectedRoute;