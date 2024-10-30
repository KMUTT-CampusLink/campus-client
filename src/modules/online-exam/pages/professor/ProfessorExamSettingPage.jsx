import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import DeleteExam from "../../components/professor/ExamSetting/DeleteExamButton";

import {
  getFullMark,
  updateExamSettings,
  getExamDataById,
} from "../../services/apis/professerApi";

export default function ProfessorExamSettingPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState({
    start_date: null,
    end_date: null,
    publish_status: false,
    view_history: true,
    is_shuffle: false,
    pass_mark: "",
    full_mark: 0,
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
      setExam({
        start_date: formatDateForInput(examData.start_date),
        end_date: formatDateForInput(examData.end_date),
        publish_status: examData.publish_status,
        view_history: examData.view_history,
        is_shuffle: examData.is_shuffle,
        pass_mark: examData.pass_mark,
        full_mark: fullMarkRes.data.fullMark,
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
  // Publsih exam modal
  const [showModal, setShowModal] = useState(false);
  const handlePublishedConfirm = () => {
    setExam({ ...exam, publish_status: !exam.publish_status });
    setShowModal(false);
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
    } else if (exam.start_date === null || exam.end_date === null) {
      setAlertMessage("Error: Start time and end time cannot be empty.");
      setAlertVisible(true);
    } else if (exam.pass_mark === null) {
      setAlertMessage("Error: Passing marks cannot be empty.");
      setAlertVisible(true);
    } else if (exam.pass_mark > exam.full_mark) {
      setAlertMessage("Error: Passing marks cannot be greater than full mark.");
      setAlertVisible(true);
    } else {
      // If validation is successful, set the submit status to true
      setIsSubmit(true);
      setAlertMessage("Your changes have been saved successfully");
      setAlertVisible(true);

      // Create the examData object
      const examData = {
        ...exam,
        start_date: exam.start_date,
        end_date: exam.end_date,
        publish_status: exam.publish_status,
        view_history: exam.view_history,
        is_shuffle: exam.is_shuffle,
        pass_mark: exam.pass_mark,
      };

      try {
        // Call API to update exam settings
        const response = await updateExamSettings(examId, examData);
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

  return (
    <>
      <NavBar />
      {/* Heading */}
      <div className=" px-[26px]  lg:px-[200px] pt-20">
        <div className="flex justify-between py-[35px] ">
          <div>
            <p className="font-bold text-[#D4A015] text-[30px]">Setting</p>
            <p className="text-[16px]">Linear Algebra Exam</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="">Exam Password</p>{" "}
            <button className="bg-[#7F483C] p-[10px] px-[20px] text-center text-[white] text-[18px] rounded-2xl">
              DF1E22
            </button>
          </div>
        </div>
        <hr className="border-t border-[#798184]" />
        {/* Content */}
        <div className="flex flex-col py-[35px]">
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
          <DeleteExam />
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
                  isSubmit ? "alert-success" : "alert-error"
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
