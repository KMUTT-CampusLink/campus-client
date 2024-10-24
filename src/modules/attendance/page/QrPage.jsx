import QrComponent from "../components/QrComponent";
import useQr from "../hook/useQr";
import NavBar from "../../registration/components/NavBarComponents/NavBar";

const QrPage = () => {
  const qr = useQr();
  return (
    <>
      <NavBar />
      <QrComponent {...qr} />
    </>
  );
};
export default QrPage;
