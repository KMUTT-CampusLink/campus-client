import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteExamById } from "../../../services/apis/professerApi";

export default function DeleteExamButton({ sectionId, examId, status, participant }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="btn bg-red-500 text-white hover:bg-red-700"
        onClick={handleOpenModal}
        disabled={status}
      >
        Delete exam
      </button>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          {/* Modal content */}
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box relative z-50">
              <h3 className="font-bold text-lg">
                Are you sure you want to delete the exam?
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
                    className="btn bg-red-500 ml-[10px] text-white hover:bg-red-700"
                    onClick={() => {
                      if (!participant) {
                        deleteExamById(examId);
                        navigate(`/exams/professor/${sectionId}`);
                      }
                    }}
                  >
                    Confirm Delete
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
