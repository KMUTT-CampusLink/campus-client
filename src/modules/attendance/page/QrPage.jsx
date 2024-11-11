import QrComponent from "../components/QrComponent";
import useQr from "../hook/useQr";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import Modal from "../components/Modal";
import { useState } from "react";

const QrPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <QrComponent />
    </>
  );
};
export default QrPage;
