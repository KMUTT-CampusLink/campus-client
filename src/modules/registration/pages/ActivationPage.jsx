import ActivationForm from "../components/ActivationForm";
import SvgBottomRight from "../components/SvgBottomRight";
import SvgTopLeft from "../components/SvgTopLeft";

function ActivationPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <SvgTopLeft />
      <SvgBottomRight />

      <h2 className="text-4xl font-bold text-center mt-10 mb-4 z-10">
        CampusLink
      </h2>
      <div className="z-10 mb-10">
        <ActivationForm />
      </div>
    </div>
  );
}

export default ActivationPage;
