import { fetchAuth } from "../services/api";
import { axiosInstance } from "../../../utils/axiosInstance";
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
    await axiosInstance.post(`/users/logout`, {}, { withCredentials: true }); // Ensure cookies are sent

    // Clear all items from localStorage
    localStorage.clear();

    window.location.href = "/regis/login"; // Redirect to login after successful logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default {
  isAuthenticated,
  logout,
};
