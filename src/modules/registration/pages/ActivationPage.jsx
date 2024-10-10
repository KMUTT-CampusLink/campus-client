import ActivationForm from "../components/FormComponents/ActivationForm";
import SvgBottomRight from "../components/SvgBottomRight";
import SvgTopLeft from "../components/SvgTopLeft";
import { logoHead, authContainer } from "../styles/styles";

function ActivationPage() {
  return (
    <div className={`${authContainer}`}>
      <SvgTopLeft />
      <SvgBottomRight />

      <h2 className={`${logoHead}`}>CampusLink</h2>
      <div className="z-10">
        <ActivationForm />
      </div>
    </div>
  );
}

export default ActivationPage;
