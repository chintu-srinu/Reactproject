



import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Optionally, don't render children if unauthorized or user is null
  if (!user || user.role !== "recruiter") {
    return null; // or a loader/spinner if you want
  }

  return <>{children}</>;
};

export default ProtectedRoute;
