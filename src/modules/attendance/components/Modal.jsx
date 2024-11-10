import { useEffect, useRef } from "react";

const Modal = ({ children, open = false, onClose }) => {

  return open ? (
    <>
      <div className=" bg-black w-full h-screen fixed z-[110] opacity-50 inset-0" onClick={onClose}></div>
      <div
        className=" bg-white min-w-52 min-h-52 max-w-[600px] max-h-[90vh] absolute z-[120] top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 p-4 overflow-auto rounded-3xl"
      >
        <div className="flex justify-end ">
          <button
            className="bg-black text-white rounded-full w-6 h-6"
            onClick={onClose}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </>
  ) : null;
};
export default Modal;
