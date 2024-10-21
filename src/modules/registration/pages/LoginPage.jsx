import LoginForm from "../components/FormComponents/LoginForm";
import SvgBottomRight from "../components/SvgBottomRight";
import SvgTopLeft from "../components/SvgTopLeft";
import { logoHead, authContainer } from "../styles/styles";

function LoginPage() {
  return (
    <div className={authContainer}>
      <SvgTopLeft aria-hidden="true" />
      <SvgBottomRight aria-hidden="true" />

      <main className="z-10">
        <h2 className={logoHead}>CampusLink</h2>
        <LoginForm />
      </main>
    </div>
  );
}

export default LoginPage;
