import QrComponent from "../components/QrComponent";
import useQr from "../hook/useQr";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import Modal from "../components/Modal";
import { useState } from "react";

const QrPage = () => {
  const Qr = useQr();
  return (
    <>
      <QrComponent {...Qr}/>
    </>
  );
};
export default QrPage;
