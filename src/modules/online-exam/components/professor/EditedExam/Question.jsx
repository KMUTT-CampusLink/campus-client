import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus } from '@fortawesome/free-solid-svg-icons';

import QuestionImageUploader from '../CreateExam/QuestionImageUploader';
import Choice from '../EditedExam/Choice'

export default function Question({
  question,
  index,
  setExam,
  exam,
  onDeleteQuestion,
  defaultScore,
}) {
  //set answer for each question
  const handleAnswerChange = (choiceText) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].answer = choiceText;
    updatedQuestions[index].options = updatedQuestions[index].options.map(option => ({
      ...option,
      isCorrect: option.choiceText === choiceText,
    }));
    setExam({ ...exam, questions: updatedQuestions });
  };


  //set score for each question
  const handleScoreChange = (e) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].score = e.target.value && e.target.value >= 0 ? parseInt(e.target.value) : null;
    setExam({ ...exam, questions: updatedQuestions });
  };

  //add choice for multiple choice question
  const addChoice = (choice) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].options.push({
      choiceText: choice.choiceText,
      choiceImg: null,
      isCorrect: choice.isCorrect || false, // Default is false
      choiceId: null,
    });
    setExam({ ...exam, questions: updatedQuestions });
  };


  //delete choice for multiple choice and checkList question
  const deleteChoice = async (choice, id) => {
    const updatedQuestions = [...exam.questions];
      updatedQuestions[index].options = updatedQuestions[index].options.filter(
        (opt) => opt !== choice
      );
      setExam({ ...exam, questions: updatedQuestions });
  };

  //set answer for each checklist question
  const handleChecklistAnswerChange = (choiceText) => {
    const updatedQuestions = [...exam.questions];
    if (!Array.isArray(updatedQuestions[index].answer)) {
      updatedQuestions[index].answer = [];
    }
    if (updatedQuestions[index].answer.includes(choiceText)) {
      updatedQuestions[index].answer = updatedQuestions[index].answer.filter(
        (ans) => ans !== choiceText
      );
    } else {
      updatedQuestions[index].answer.push(choiceText);
    }
    setExam({ ...exam, questions: updatedQuestions });
  };

  //set image for each question
  const setImage = (file) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].image = file;
    setExam({ ...exam, questions: updatedQuestions });
  };

  return (
    <div className="grid gap-[10px]">
      <div className="flex justify-between align-middle pt-[20px]">
        <h4 className="text-[18px] font-bold">{`Question ${index + 1}`}</h4>
        <div className="flex gap-[20px]">
          <div className="flex gap-[10px] items-center">
            <h4>Score: </h4>
            <input
              type="number"
              placeholder="-"
              className="input input-bordered w-[100px] h-[40px]"
              value={question.score}
              onChange={handleScoreChange}
            />
          </div>
          <button onClick={() => onDeleteQuestion(question.questionId)}>
            <FontAwesomeIcon icon={faTrash} className="text-[#864E41]" />
          </button>
        </div>
      </div>
      <textarea
        className="border rounded-xl h-[100px] p-[10px] w-full"
        type="text"
        placeholder="Question Text"
        value={question.questionText}
        onChange={(e) => {
          const updatedQuestions = [...exam.questions];
          updatedQuestions[index].questionText = e.target.value;
          setExam({ ...exam, questions: updatedQuestions });
        }}
      />
      <QuestionImageUploader setImage={setImage} imgURL={`${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}/${question.questionImg}`}/>
      <select
        className="w-[200px] border rounded-lg p-[7px]"
        value={question.type}
        onChange={(e) => {
          const updatedQuestions = [...exam.questions];
          updatedQuestions[index].type = e.target.value;
          if (e.target.value === 'Checklist') {
            updatedQuestions[index].answer = [];
          } else {
            updatedQuestions[index].answer = '';
          }
          setExam({ ...exam, questions: updatedQuestions });
        }}
      >
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="Checklist">Checklist</option>
        <option value="Essay">Essay</option>
      </select>

      {question.type === 'Multiple Choice' && (
        <>
          {question.options.map((option, i) => (
            <div key={i} className="flex flex-col gap-[10px]">
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-[10px] items-center">
                  <input
                    className="radio checked:bg-[#C76650]"
                    type="radio"
                    name={`question-${index}`}
                    value={option.choiceText}
                    checked={question.answer == option.choiceText}
                    onChange={() => handleAnswerChange(option.choiceText)}
                  />
                  {option.choiceText ? option.choiceText : option}
                </div>
                <div className="flex items-center">
                  <button onClick={() => deleteChoice(option)} className="ml-[30px]">
                    <FontAwesomeIcon icon={faMinus} className="text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Choice onAddChoice={addChoice} />
        </>
      )}

      {question.type === 'Checklist' && (
        <>
          {question.options.map((option, i) => (
            <div key={i} className="flex flex-col gap-[10px]">
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-[10px] items-center">
                  <input
                    className="checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]"
                    type="checkbox"
                    checked={question.answer.includes(option.choiceText)} // Use choiceText
                    onChange={() => handleChecklistAnswerChange(option.choiceText)} // Pass choiceText
                  />
                  {option.choiceText ? option.choiceText : option}
                </div>
                <div className="flex items-center">
                  <button onClick={() => deleteChoice(option)} className="ml-[30px]">
                    <FontAwesomeIcon icon={faMinus} className="text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Choice onAddChoice={addChoice} />
        </>
      )}
    </div>
  );
}
