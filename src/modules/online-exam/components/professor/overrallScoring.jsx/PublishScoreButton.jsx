
import React, { useState } from "react";

export default function PublishScoreButton() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="bg-[#7F483C] p-[10px] px-[15px] text-center text-[white] text-[18px] rounded-2xl"
        onClick={handleOpenModal}
      >
        Publish Scores
      </button>

      {showModal && (
        <>
          {/* Black background overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

          {/* Modal content */}
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box relative z-50">
              <h3 className="font-bold text-lg">
                Are you sure you want to publish the exam?
              </h3>
              <p className="py-4">
                Please be aware that this action cannot be undone.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleCloseModal}
                  >
                    Cancle
                  </button>
                  <button
                    type="button"
                    className="btn bg-green-500 ml-[10px] text-white hover:bg-green-700"
                    onClick={handleCloseModal} // You might want to implement the delete logic here
                  >
                    Confirm Publish
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}

