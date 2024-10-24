import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../services/api";
import FormInput from "./FormInput";
import { formHead, formBg, button } from "../../styles/styles";
import SmallNavText from "./SmallNavText";

function LoginForm() {
  const [campus_email, setCampusEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Mutation for logging in
  const loginMutation = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      const { id, role, studentId } = data;
      localStorage.setItem("userId", id);
      localStorage.setItem("userRole", role);
      localStorage.setItem("studentId", studentId);
      navigate("/regis");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!campus_email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");

    // Handle form submission
    loginMutation.mutate({ campus_email, password });
  };

  return (
    <div className={`${formBg}`}>
      <h3 className={`${formHead}`}>Log in to System</h3>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* Campus Email */}
        <FormInput
          name="Campus Email"
          type="email"
          placeholder="campus@edu.com"
          value={campus_email}
          onChange={(e) => setCampusEmail(e.target.value)}
        />

        {/* Password */}
        <FormInput
          name="Password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showToggle={true}
          toggleVisibility={togglePasswordVisibility}
        />

        {/* Submit Button */}
        <button type="submit" className={`${button}`}>
          sign-in
        </button>

        <SmallNavText to="/regis/activation" name="Activate Your Account?" />
      </form>
    </div>
  );
}

export default LoginForm;
