import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { formColors } from "../styles/colors"; 

function LoginForm() {
  const [schoolEmail, setSchoolEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("School Email:", schoolEmail, "Password:", password);
  };

  return (
    <div className={`bg-[${formColors.background}] rounded-lg shadow-md p-6`}>
      <h3
        className={`text-center text-2xl font-bold text-[${formColors.primary}] mb-4`}
      >
        Log in to System
      </h3>

      <form onSubmit={handleSubmit}>
        {/* School Email */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">School Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="school@edu.com"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${formColors.focusRing}`}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${formColors.focusRing}`}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-[${formColors.primary}] hover:bg-[${formColors.primaryHover}] text-white py-3 rounded-lg font-semibold transition duration-300`}
        >
          sign-in
        </button>

        <div className="text-center mt-2">
          <Link
            to="/regis/activation"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Activate Your Account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
