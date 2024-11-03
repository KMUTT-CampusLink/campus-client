import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../../registration/components/NavBarComponents/NavBar";
import Question from "../../components/professor/EditedExam/Question";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faGear } from "@fortawesome/free-solid-svg-icons";

import { getExamDataById, updateExam } from "../../services/apis/professerApi";

export default function ProfessorEditExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  //exam data all stored in here
  const [exam, setExam] = useState({
    examId: examId,
    title: "",
    description: "",
    questions: [],
  });
  const getExamData = async () => {
    try {
      const res = await getExamDataById(examId);
      const examData = res.data.data.exam;
      const examQuestion = res.data.data.questions;
      const allChoices = res.data.data.choices;
      const mappedQuestions =
        examQuestion && Array.isArray(examQuestion)
          ? examQuestion.map((question) => {
              const questionChoices = allChoices.filter(
                (choice) => choice.question_id === question.id
              );
              return {
                questionId: question.id || null,
                questionText: question.title || "",
                type: question.type
                  ? question.type.replace("_", " ")
                  : "Multiple Choice",
                options: questionChoices.map((choice) => ({
                  choiceText: choice.choice_text || "",
                  choiceImg: choice.choice_img || null,
                  isCorrect: choice.correct_ans || false,
                  choiceId: choice.id || null,
                })),
                answer: questionChoices
                  .filter((choice) => choice.correct_ans)
                  .map((choice) => choice.choice_text || ""),
                score: question.mark || null,
              };
            })
          : [];
      setExam({
        ...exam,
        title: examData.title || "Untitled Exam",
        description: examData.description || "No description",
        questions: mappedQuestions,
      });
    } catch (error) {
      console.error("Failed to fetch exam data:", error);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  //default score for all questions
  const [defaultScore, setDefaultScore] = useState(1);

  // set exam name function
  const handleExamNameChange = (e) => {
    setExam({ ...exam, title: e.target.value });
  };

  // set description for exam function
  const handleDescriptionChange = (e) => {
    setExam({ ...exam, description: e.target.value });
  };

  // set default score for all questions function
  const handleDefaultScoreChange = (e) => {
    const score = parseInt(e.target.value);
    if (score <= 0) {
      setDefaultScore(1);
      return;
    }
    setDefaultScore(score);
    const updatedQuestions = exam.questions.map((question) => ({
      ...question,
      score: question.score || score,
    }));

    setExam({ ...exam, questions: updatedQuestions });
  };

  // add question function
  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [
        ...exam.questions,
        {
          questionText: "",
          type: "Multiple Choice",
          options: [],
          answer: "",
          score: null,
        },
      ],
    });
  };

  // delete question function
  const deleteQuestion = (index) => {
    const updatedQuestions = exam.questions.filter((_, i) => i !== index);
    setExam({ ...exam, questions: updatedQuestions });
  };

  // Submit exam function
  const handleSubmit = async () => {
    const finalExam = {
      ...exam,
      questions: exam.questions.map((question) => ({
        ...question,
        score: question.score || defaultScore,
        options: question.options.map((option) => ({
          choiceText: option.choiceText,
          choiceImg: option.choiceImg,
          isCorrect: option.isCorrect,
          choiceId: option.choiceId,
        })),
      })),
    };
    const res = await updateExam(finalExam);
    if (res.status === 200) {
      navigate(`/exams/professor/setting/${1}`);
    }
  };

  // console.log(exam)

  return (
    <div className="w-auto">
      <Navbar />
      <div className="mx-[35px] xl:mx-[100px] pb-[30px] pt-20">
        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex flex-col xl:flex-row xl:justify-between  xl:items-center">
            <h1 className="text-[30px] xl:text-[40px] font-extrabold text-[#D4A015]">
              Edit Exam
            </h1>
            {/* view as student button */}
            <div className="flex gap-4">
              <button className="btn">
                <FontAwesomeIcon icon={faEye} /> View as student
              </button>
              <button
                className="btn text-white bg-[#864E41] hover:bg-[#6e4339]"
                onClick={() => navigate(`/exams/professor/setting/${examId}`)}
              >
                <FontAwesomeIcon icon={faGear} /> Exam setting
              </button>
            </div>
          </div>
          {/* exam details */}
          <h4>Exam Name</h4>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Exam Name Here"
            value={exam.title}
            onChange={handleExamNameChange}
          />
          <h4>Description</h4>
          <textarea
            className="textarea textarea-bordered w-full h-[100px]"
            placeholder="Description Here"
            value={exam.description}
            onChange={handleDescriptionChange}
          ></textarea>
          {/* set default score for all questions */}
          <div className="flex gap-[10px] items-center">
            <h4>Set Default Score: </h4>
            <input
              type="number"
              className="input input-bordered w-[100px] h-[40px]"
              value={defaultScore}
              onChange={handleDefaultScoreChange}
            />
          </div>
          {/* Map question */}
          {exam &&
            exam.questions.map((question, index) => (
              <>
                <hr className="mt-[20px] border-[1px] bg-[#BEBEBE]" />
                <Question
                  key={index}
                  question={question}
                  index={index}
                  setExam={setExam}
                  exam={exam}
                  onDeleteQuestion={deleteQuestion}
                  defaultScore={defaultScore}
                />
              </>
            ))}
          {/* Add question button */}
          <button
            className="btn bg-[#864E41] hover:bg-[#6e4339] text-white"
            onClick={addQuestion}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Question
          </button>
        </div>
        <hr className="mt-[30px] border" />
        {/* subnit exam button */}
        <div className="flex justify-end pt-[30px]">
          <button
            className="btn bg-[#27AE60] hover:bg-[#3f9060] text-white"
            onClick={() => document.getElementById("confirmModal").showModal()}
          >
            Confirm Edited Exam
          </button>
          <dialog id="confirmModal" className="p-[30px] rounded-xl">
            <h3 className="font-bold text-lg">Confirm Submit the Exam?</h3>
            <p className="py-4">You can submit the exam only once.</p>
            <div className="modal-action">
              <form method="dialog" className="flex flex-row gap-[20px]">
                <button className="btn bg-[#EC5A51] hover:bg-[#d5564f] text-white">
                  Close
                </button>
                <button
                  className="btn bg-[#27AE60] hover:bg-[#3f9060] text-white"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Confirm
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
