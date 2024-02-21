/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../sharedPages/Context/AuthProvider";
import { notification } from "antd";
// import { use } from "i18next";

const PrivateRoute = ({ children }) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();

  

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Notify and redirect if not logged in
        notification["warning"]({
          message: "Access Denied",
          description: "You need to log in to access this page.",
          placement: "topRight",
          duration: 3.5,
        });
        // Redirect to login
      } else if (user.role !== "admin") {
        // Notify if not an admin
        notification["error"]({
          message: "Forbidden",
          description: "You do not have permission to view this page.",
          placement: "topRight",
          duration: 3.5,
        });
        // Redirect or perform some other action
      }
    }
  }, [user, loading]);


if (loading) {
  return <button className="btn btn-square loading">Loading...</button>;
}

if (!user || user.role !== "admin") {
  // Redirect non-admins or not logged in users to login page or another page
  return <Navigate to="/login" state={{ from: location }} replace />;
}

return children; // Render children if user is logged in and is an admin
};

export default PrivateRoute;
