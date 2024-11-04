
import StQrComponent from "../components/StQrComponent";

import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useStQr from "../hook/useStQr";

const StQrPage = () => {
  const stQr = useStQr();
  return (
    <>
      <NavBar />
      <StQrComponent {...stQr} />
    </>
  );
};
export default StQrPage;
