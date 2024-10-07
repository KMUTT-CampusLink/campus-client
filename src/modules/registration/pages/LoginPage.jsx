import LoginForm from "../components/LoginForm";
import SvgBottomRight from "../components/SvgBottomRight";
import SvgTopLeft from "../components/SvgTopLeft";

function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <SvgTopLeft />
      <SvgBottomRight />
      <h2 className="text-4xl font-bold text-center mb-8 z-10">CampusLink</h2>
      <div className="z-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
