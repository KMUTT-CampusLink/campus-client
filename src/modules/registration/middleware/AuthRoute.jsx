import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authConfig from "../auth/authConfig";

const AuthRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors if auth check fails

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await authConfig.isAuthenticated(); // Check if the user is authenticated
        setIsAuthenticated(!!authStatus); // Authenticated if authStatus is truthy
      } catch (err) {
        setError("Failed to authenticate. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading once the check is done
      }
    };

    checkAuth();
  }, []);

  // If still loading, show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an issue with authentication
  if (error) {
    return <div>{error}</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/regis/login" replace />;
  }

  // Render children or outlet if authenticated
  return children ? children: <Outlet />;
};

export default AuthRoute;
