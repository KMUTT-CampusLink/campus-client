import { useState } from "react";
import FormInput from "./FormInput";
import { formHead, formBg, button } from "../../styles/styles";
import SmallNavText from "./SmallNavText";
function ActivationForm() {
  const [email, setEmail] = useState("");
  const [campusEmail, setCampusEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(
      "Personal Email:",
      email,
      "Campus Email:",
      campusEmail,
      "Password:",
      password
    );
  };

  return (
    <div className={`${formBg}`}>
      <h3 className={`${formHead}`}>Activate Your Account</h3>

      <form onSubmit={handleSubmit}>
        {/* Campus Email */}
        <FormInput
          name="Campus Email"
          type="email"
          placeholder="campus@edu.com"
          value={campusEmail}
          onChange={(e) => setCampusEmail(e.target.value)}
        />

        {/* Personal Email */}
        <FormInput
          name="Email"
          type="email"
          placeholder="personal@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {/* Confirm Password */}
        <FormInput
          name="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showToggle={true}
          toggleVisibility={togglePasswordVisibility}
        />

        {/* Submit Button */}
        <button type="submit" className={`${button}`}>
          Activate
        </button>

        <SmallNavText to="/regis/login" name="Log in to Your Account?" />
      </form>
    </div>
  );
}

export default ActivationForm;
