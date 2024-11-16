import { Flip, toast } from "react-toastify";

const popToast = (message, type, theme = "light") => {
  toast(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    pauseOnFocusLoss: false,
    theme: theme,
    transition: Flip,
    type: type || "default",
    bodyClassName: "toast-custom-font",
  });
};

export default popToast;
