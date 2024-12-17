import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Participant from "../../components/professor/overrallScoring/Participant";
import BackBTN from "../../components/BackBTN";

import { getExamDataById } from "../../services/apis/professerApi";
import { getExamParticipants } from "../../services/apis/professerApi";
import { updateExamAnnouncement } from "../../services/apis/professerApi";
import { getAllStudentInSection } from "../../services/apis/professerApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

export default function ProfessorOverallScoringPage() {
  const { examId, sectionId } = useParams();
  const [examTitle, setExamTitle] = useState("");
  const [participants, setParticipants] = useState([]);
  const [fullMark, setFullMark] = useState(0);
  const [passMark, setPassMark] = useState(0);
  const [scoringFinished, setScoringFinished] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnnounced, setIsAnnounced] = useState();
  const [hasParticipants, setHasParticipants] = useState(false);
  const [totalStudentInSection, setTotalStudentInSection] = useState();
  const getNumberStudentInsection = async () => {
    try {
      const response = await getAllStudentInSection(sectionId);
      setTotalStudentInSection(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getParticipants = async () => {
    try {
      const response = await getExamParticipants(examId);
      console.log(response)
      const participants = response.data.data;
      setFullMark(response.data.full_mark);
      setPassMark(response.data.pass_mark);
      setParticipants(response.data.data);
      setScoringFinished(
        response.data.data.filter((participant) => participant.is_checked)
          .length
      );
      setHasParticipants(participants.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  const getExamTitle = async () => {
    try {
      const response = await getExamDataById(examId);
      setExamTitle(response.data.data.exam.title);
      setIsAnnounced(response.data.data.exam.publish_score_status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParticipants();
    getExamTitle();
    getNumberStudentInsection();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleConfirmPublish = async () => {
    try {
      const newIsAnnounced = true;
      setIsAnnounced(newIsAnnounced);
      const response = await updateExamAnnouncement(examId, newIsAnnounced);
      if (response.status === 200) {
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error publishing exam:", error);
    }
  };

  return (
    <div className="w-auto">
      <NavBar />
      {/* Heading */}
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <BackBTN />
        <div className="flex justify-between items-center pb-[35px]">
          <div>
            <p className="font-bold text-[#D4A015] text-[30px]">Scoring</p>
            <p className="text-[16px]">{examTitle} Exam</p>
          </div>

          <div className="flex flex-col justify-end items-end">
            {/* Button to open the modal */}
            <button
              className="btn bg-[#864E41] hover:bg-[#6e4339] text-white mt-[10px]"
              onClick={handleOpenModal}
              disabled={
                isAnnounced ||
                !hasParticipants ||
                scoringFinished != participants.length
              } // Disable if already announced
            >
              <FontAwesomeIcon icon={faBullhorn} />
              {isAnnounced ? "Scores Annouced" : "Annouce Scores"}
            </button>
            {isAnnounced && (
              <p className="text-red-600 text-[12px] md:text-[14px] pt-1">
                Score has already been announced
              </p>
            )}
          </div>
        </div>
        <hr className="bg-[#bebebe]" />
        {/* content */}
        <div className=" py-[30px] ">
          <p className="font-bold text-[#D4A015] text-[22px] pb-[10px]">
            Participants
          </p>
          <div className="text-[14px] md:text-[16px]">
            <div className="flex">
              <p className=" font-bold">
                Students Completed:<span>&nbsp;</span>
              </p>
              <p className="">{participants.length}</p>
              <p className="">/</p>
              <p className="">{totalStudentInSection}</p>
              <p className="">
                <span>&nbsp;</span>student
              </p>
            </div>
            <div className="flex pb-[10px]">
              <p className=" font-bold">
                Scoring Progress:<span>&nbsp;</span>
              </p>
              <p className="">{scoringFinished}</p>
              <p className="">/</p>
              <p className="">{participants.length}</p>
              <p className="">
                <span>&nbsp;</span>student
              </p>
            </div>
          </div>

          <p className="w-[100%] flex rounded-lg text-[12px] text-center lg:text-[14px] px-[15px] py-[15px] gap-[10px]">
            <p className="w-[20%]">ID number</p>
            <p className="w-[45%]">Name</p>
            <p className="w-[10%]">Score</p>
            <p className="w-[10%]">Total score</p>
            <p className="w-[15%]">Status</p>
          </p>
          <hr className="bg-[#bebebe] mb-[20px]" />
          <Participant
            examId={examId}
            participants={participants}
            fullMark={fullMark}
            passMark={passMark}
  
          />
        </div>
      </div>
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
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn bg-green-500 ml-[10px] text-white hover:bg-green-700"
                    onClick={handleConfirmPublish}
                    disabled={isAnnounced} // Disable confirm button if already announced
                  >
                    Confirm Publish
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}
