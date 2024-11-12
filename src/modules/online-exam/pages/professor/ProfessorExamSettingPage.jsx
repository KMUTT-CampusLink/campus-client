import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import DeleteExam from "../../components/professor/ExamSetting/DeleteExamButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileLines } from "@fortawesome/free-solid-svg-icons";

import {
  getFullMark,
  updateExamSettings,
  getExamDataById,
} from "../../services/apis/professerApi";

export default function ProfessorExamSettingPage() {
  const { Id } = 1;
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    start_date: null,
    end_date: null,
    publish_status: false,
    view_history: true,
    is_shuffle: false,
    pass_mark: "",
    full_mark: 0,
    pin: "",
    title: "",
    is_publish_immediately: false,
  });
  //convert ISO date to input format
  const formatDateForInput = (isoDate) => {
    if (isoDate === null) return "";
    else {
      const date = new Date(isoDate);
      const formattedDate = date.toISOString().slice(0, 16); // Removes the 'Z' and milliseconds
      return formattedDate;
    }
  };

  const getAllExamData = async () => {
    try {
      const res = await getExamDataById(examId);
      const fullMarkRes = await getFullMark(examId);
      const examData = res.data.data.exam;
      console.log(examData);
      setExam({
        start_date: formatDateForInput(examData.start_date),
        end_date: formatDateForInput(examData.end_date),
        publish_status: examData.publish_status,
        view_history: examData.view_history,
        is_shuffle: examData.is_shuffle,
        pass_mark: examData.pass_mark,
        full_mark: fullMarkRes.data.fullMark,
        pin: examData.pin,
        title: examData.title,
        is_publish_immediately: examData.is_publish_immediately,
      });
    } catch (error) {
      console.error("Failed to fetch exam data:", error);
    }
  };

  const handleStartDatetimeChange = (event) => {
    setExam({ ...exam, start_date: event.target.value });
  };
  const handleEndDatetimeChange = (event) => {
    setExam({ ...exam, end_date: event.target.value });
  };
  const handlePassingMarksChange = (event) => {
    setExam({ ...exam, pass_mark: parseInt(event.target.value) });
  };
  const handleHistoryToggleChange = () => {
    setExam({ ...exam, view_history: !exam.view_history });
  };
  const handleShuffleToggleChange = () => {
    setExam({ ...exam, is_shuffle: !exam.is_shuffle });
  };
  const handlePinChange = (event) => {
    setExam({ ...exam, pin: event.target.value });
  };
  const handlePublishedImmediately = () => {
    setExam({ ...exam, is_publish_immediately: !exam.is_publish_immediately });
  };
  // Publsih exam modal
  const [showModal, setShowModal] = useState(false);
  const handlePublishedConfirm = () => {
    if (
      exam.start_date === "" ||
      exam.end_date === "" ||
      exam.pass_mark === null ||
      exam.pin === null
    ) {
      setAlertMessage(
        "Error: Please complete Exam Password, Duration, and Passing Marks, then click Submit Changes before publish."
      );
      setAlertVisible(true);
      setShowModal(false);
    } else {
      setExam({ ...exam, publish_status: !exam.publish_status });
      setShowModal(false);
    }
    setTimeout(() => {
      setAlertVisible(false);
    }, 5000);
  };

  //alert for submit
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset alert and submit status before validation
    setAlertVisible(false);
    setIsSubmit(false);

    if (exam.end_date < exam.start_date) {
      setAlertMessage("Error: End time cannot be less than start time.");
      setAlertVisible(true);
    } else if (exam.start_date === "" || exam.end_date === "") {
      setAlertMessage("Error: Start time and end time cannot be empty.");
      setAlertVisible(true);
    } else if (exam.pass_mark === null) {
      setAlertMessage("Error: Passing marks cannot be empty.");
      setAlertVisible(true);
    } else if (exam.pass_mark > exam.full_mark) {
      setAlertMessage("Error: Passing marks cannot be greater than full mark.");
      setAlertVisible(true);
    } else {
      // Create the examData object
      const examData = {
        ...exam,
        start_date: exam.start_date,
        end_date: exam.end_date,
        publish_status: exam.publish_status,
        view_history: exam.view_history,
        is_shuffle: exam.is_shuffle,
        pass_mark: exam.pass_mark,
        pin: exam.pin,
        title: exam.title,
        is_publish_immediately: exam.is_publish_immediately,
      };

      try {
        // Call API to update exam settings
        const response = await updateExamSettings(examId, examData);
        navigate(`/exams/professor/1`, {
          state: {
            isSettingSubmit: true,
            alertMessage: "Your changes have been saved successfully",
          },
        });
      } catch (error) {
        console.error("Error updating exam settings:", error);
        setIsSubmit(false);
        setAlertMessage("Error submitting data.");
        setAlertVisible(true);
      }
    }
    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };
  useEffect(() => {
    getAllExamData();
  }, []);

  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exam.pin).then(() => {
      setAlertMessage("Pin copied to clipboard!");
      setAlertVisible(true);
      setIsCopied(true);
    });
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  return (
    <>
      <NavBar />
      {/* Heading */}
      <div className=" px-[35px]  lg:px-[100px] pt-20">
        <div className="flex justify-between pb-[35px] pt-[25px] items-center">
          <div>
            <p className="font-bold text-[#D4A015] text-[30px]">Exam Setting</p>
            <p className="text-[20px] font-bold">Exam: {exam.title}</p>
          </div>

          <button
            className="btn text-white bg-[#864E41] hover:bg-[#6e4339]"
            onClick={() => navigate(`/exams/professor/edit/${examId}`)}
          >
            <FontAwesomeIcon icon={faFileLines} /> Edit Exam Question
          </button>
        </div>
        <hr className="border-t border-[#798184]" />
        {/* Content */}

        <div className="flex flex-col py-[35px]">
          <div className="flex gap-[10px] items-center pb-[20px]">
            <label
              className="pr-[9px] text-[black] text-[18px] font-bold"
              for="meeting-time"
            >
              Exam password
            </label>
            <input
              className="border-2 border-[#798184] rounded-xl  px-[10px] py-[7px] text-center w-[210px] appearance-none"
              name=""
              id=""
              value={exam.pin}
              onChange={handlePinChange}
            />
            <button>
              <FontAwesomeIcon
                icon={faCopy}
                className="text-[#798184]  text-xl"
                onClick={handleCopyToClipboard}
              />
            </button>
          </div>

          {/* start & end date time input */}
          <div className="flex flex-col gap-[10px] sm:items-center pb-[20px] sm:flex-row">
            <label
              className="pr-[15px] text-[black] text-[18px] font-bold"
              for="meeting-time"
            >
              Exam duration
            </label>
            <input
              className="border-2 border-[#798184] rounded-xl px-[15px] py-[7px]"
              type="datetime-local"
              id="start-datetime"
              name="start-datetime"
              value={exam.start_date}
              onChange={handleStartDatetimeChange}
            />
            <p>to</p>
            <input
              className="border-2 border-[#798184] rounded-xl px-[15px] py-[7px]"
              type="datetime-local"
              id="end-datetime"
              name="end-datetime"
              value={exam.end_date}
              onChange={handleEndDatetimeChange}
            />
          </div>
          {/* psssing mark & full mark */}

          <div className="flex gap-[10px] items-center">
            <label
              className="pr-[19px] text-[black] text-[18px] font-bold"
              for="meeting-time"
            >
              Passing marks
            </label>
            <input
              className="border-2 border-[#798184] rounded-xl  px-[10px] py-[7px] text-center w-[80px] appearance-none"
              type="number"
              name=""
              id=""
              min="0"
              value={exam.pass_mark}
              onChange={handlePassingMarksChange}
            />
            <p>/</p>
            <p>{exam.full_mark}</p>
          </div>
        </div>

        <hr className="border-t border-[#798184]" />

        {/* Content 2*/}
        <div className=" py-[35px]">
          {/* allow view exam answers */}
          <div className="flex items-center pb-[20px] justify-between">
            <div className="">
              <p className="pr-[15px] text-[black] text-[18px] font-bold">
                Allow view exam answers
              </p>
              <p className="text-[16px]">
                Enable students to view their exam answers after the score is
                published.
              </p>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={exam.view_history}
                  onChange={handleHistoryToggleChange}
                />
                <span className="label-text ml-[10px]">Allow</span>
              </label>
            </div>
          </div>
          {/* shuffle QA */}
          <div className="flex items-center pb-[20px] justify-between">
            <div className="">
              <p className="pr-[15px] text-[black] text-[18px] font-bold">
                Shuffle questions
              </p>
              <p className="text-[16px]">
                Rearranges the order of exam questions
              </p>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={exam.is_shuffle}
                  onChange={handleShuffleToggleChange}
                />
                <span className="label-text ml-[10px]">Allow</span>
              </label>
            </div>
          </div>

          {/* publihsed immediately */}
          <div className="flex items-center pb-[20px] justify-between">
            <div className="">
              <p className="pr-[15px] text-[black] text-[18px] font-bold">
                Publish score immediately
              </p>
              <p className="text-[16px]">
                Automatically display scores to participants when the exam ends.
              </p>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={exam.is_publish_immediately}
                  onChange={handlePublishedImmediately}
                />
                <span className="label-text ml-[10px]">Allow</span>
              </label>
            </div>
          </div>
        </div>
        <hr className="border-t border-[#798184]" />
        {/* Publish exam */}
        <div className=" py-[35px]">
          <div className="flex items-center pb-[20px] justify-between">
            <div className="">
              <p className="pr-[15px] text-[black] text-[18px] font-bold">
                Publish exam
              </p>
              <p className="text-[16px]">
                Enable students to access and begin the exam
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="label-text pb-[2px]">Current stage</span>
              <button
                className={`btn ${
                  exam.publish_status
                    ? "bg-green-500 hover:bg-green-700"
                    : "bg-red-500 hover:bg-red-700"
                } text-white`}
                onClick={() => setShowModal(true)}
              >
                {exam.publish_status ? "Published" : "Unpublished"}
              </button>
            </div>
            {/* Publish exam modal*/}
            {showModal && (
              <>
                {/* Black background overlay */}
                <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                {/* Modal content */}
                <dialog id="my_modal_1" className="modal modal-open">
                  <div className="modal-box relative z-50">
                    <h3 className="font-bold text-lg">
                      {exam.publish_status
                        ? "Are you sure you want to publish the exam?"
                        : "Are you sure you want to unpublish the exam?"}
                    </h3>
                    <p className="py-4">
                      {exam.publish_status
                        ? "Publishing this exam will make it accessible."
                        : "Unpublishing this exam will make it inaccessible"}
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
                          onClick={handlePublishedConfirm}
                        >
                          Confirm
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </>
            )}
          </div>
        </div>
        {/* Delete exam button*/}
        <div className="flex justify-center mb-[60px] gap-[10px] px-[100]">
          <DeleteExam examId={examId} />
          {/* Submit change button */}
          <form>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#7F483C] p-[10px] px-[20px] text-[white] btn hover:bg-[#653328]"
            >
              Submit change
            </button>
          </form>

          {/* Alert */}
          {alertVisible && (
            <div className="toast toast-center">
              <div
                className={`alert ${
                  isCopied ? "alert-success" : "alert-error"
                }`}
              >
                <span className="text-white">{alertMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
