import ActivationForm from "../components/FormComponents/ActivationForm";
import SvgBottomRight from "../components/SvgBottomRight";
import SvgTopLeft from "../components/SvgTopLeft";
import { logoHead, authContainer } from "../styles/styles";

function ActivationPage() {
  return (
    <div className={`${authContainer}`}>
      <SvgTopLeft aria-hidden="true" />
      <SvgBottomRight aria-hidden="true" />

      <main className="z-10">
        <h2 className={logoHead}>CampusLink</h2>
        <ActivationForm />
      </main>
    </div>
  );
}

export default ActivationPage;
