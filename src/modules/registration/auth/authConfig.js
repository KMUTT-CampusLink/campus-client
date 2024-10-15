import { fetchAuth } from "../services/api";
import axios from "axios";

// Function to check if the user is authenticated and store the role in localStorage
const isAuthenticated = async () => {
  try {
    const response = await fetchAuth(); // Call to the backend

    if (response.data.id) {
      return true;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false; // Return false if not authenticated or there's an error
  }
};

// Function to log out the user and clear localStorage
const logout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true }); // Ensure cookies are sent

    // Clear the role from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("studentId");

    window.location.href = "/regis/login"; // Redirect to login after successful logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default {
  isAuthenticated,
  logout,
};
