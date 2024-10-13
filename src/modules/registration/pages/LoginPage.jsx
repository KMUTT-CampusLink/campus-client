import LoginForm from "../components/FormComponents/LoginForm";
import SvgBottomRight from "../components/SvgBottomRight";
import SvgTopLeft from "../components/SvgTopLeft";
import { logoHead, authContainer } from "../styles/styles";
function LoginPage() {
  return (
    <div className={`${authContainer}`}>
      <SvgTopLeft />
      <SvgBottomRight />
      <h2 className={`${logoHead}`}>CampusLink</h2>
      <div className="z-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
