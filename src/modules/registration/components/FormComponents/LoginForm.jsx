import { useState } from "react";
import FormInput from "./FormInput";
import { formHead, formBg, button } from "../../styles/styles";
import SmallNavText from "./SmallNavText";

function LoginForm() {
  const [campusEmail, setCampusEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Campus Email:", campusEmail, "Password:", password);
  };

  return (
    <div className={`${formBg}`}>
      <h3 className={`${formHead}`}>Log in to System</h3>

      <form onSubmit={handleSubmit}>
        {/* Campus Email */}
        <FormInput
          name="Campus Email"
          type="email"
          placeholder="campus@edu.com"
          value={campusEmail}
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
