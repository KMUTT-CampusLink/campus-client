
import QrComponent from "../components/QrComponent";

import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useStQr from "../hook/useStQr";

const StQrPage = () => {
  const stqr = useStQr();
  return (
    <>
      <NavBar />
      <QrComponent {...stqr} />
    </>
  );
};
export default StQrPage;
