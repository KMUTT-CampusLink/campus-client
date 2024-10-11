import React, { useState } from "react";

export default function PublishButton() {
  const [isPublished, setIsPublished] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setIsPublished(!isPublished);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="label-text pb-[2px]">Current stage</span>
        <button
          className={`btn ${
            isPublished ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
          } text-white`}
          onClick={() => setShowModal(true)}
        >
          {isPublished ? "Unpublished" : "Published"}
        </button>
      </div>

      {showModal && (
        <>
          {/* Black background overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          
          {/* Modal content */}
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box relative z-50">
              <h3 className="font-bold text-lg">
                {isPublished
                  ? "Are you sure you want to publish the exam?"
                  : "Are you sure you want to unpublish the exam?"}
              </h3>
              <p className="py-4">
                {isPublished
                  ? "Publishing this exam will make it accessible."
                  : "Unpublishing this exam will make it inaccessible."}
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    type="button"
                    className="btn bg-red-500 text-white hover:bg-red-700"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn ml-[10px] bg-green-500 text-white hover:bg-green-700"
                    onClick={handleConfirm}
                  >
                    Confirm
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
