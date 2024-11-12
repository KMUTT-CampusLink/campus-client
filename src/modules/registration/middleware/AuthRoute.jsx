import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authConfig from "../auth/authConfig";
import popToast from "../../../utils/popToast";

const AuthRoute = ({ children, allowed_roles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors if auth check fails

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await authConfig.isAuthenticated(); // Check if the user is authenticated
        setIsAuthenticated(!!authStatus); // Authenticated if authStatus is true

        // role-based access control
        if (authStatus && allowed_roles) {
          const user_role = localStorage.getItem("userRole");
          setIsAllowed(
            allowed_roles.some(
              (role) => role.toLowerCase() === user_role.toLowerCase()
            )
          );
        }
      } catch (err) {
        console.log(err);
        setError("Failed to authenticate. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading once the check is done
      }
    };

    checkAuth();
  }, [allowed_roles]);

  useEffect(() => {
    // Show popToast when user is redirected, but only once
    if (isLoading || error) return; // Do nothing if loading or error exists

    if (!isAuthenticated) {
      popToast("Please Login First", "warning");
    }

    if (!isAllowed) {
      popToast("Access not Allowed", "warning");
    }
  }, [isAuthenticated, isAllowed, isLoading, error]);

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

  // Redirect to unauthorized page if not allowed
  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children or outlet if authenticated
  return children ? children : <Outlet />;
};

export default AuthRoute;
