import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus } from '@fortawesome/free-solid-svg-icons';

import QuestionImageUploader from './QuestionImageUploader';
import ChoiceImageUploader from './ChoiceImageUploader';
import Choice from './Choice';

export default function Question({
  question,
  index,
  setExam,
  exam,
  onDeleteQuestion,
  defaultScore,
}) {
  //set answer for each question
  const handleAnswerChange = (value) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].answer = value;
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
    updatedQuestions[index].options.push(choice);
    setExam({ ...exam, questions: updatedQuestions });
  };

  //delete choice for multiple choice and checkList question
  const deleteChoice = (choice) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].options = updatedQuestions[index].options.filter(
      (opt) => opt !== choice
    );
    setExam({ ...exam, questions: updatedQuestions });
  };

  //set answer for each checklist question
  const handleChecklistAnswerChange = (option) => {
    const updatedQuestions = [...exam.questions];
    if (!Array.isArray(updatedQuestions[index].answer)) {
      updatedQuestions[index].answer = [];
    }
    if (updatedQuestions[index].answer.includes(option)) {
      updatedQuestions[index].answer = updatedQuestions[index].answer.filter(
        (ans) => ans !== option
      );
    } else {
      updatedQuestions[index].answer.push(option);
    }
    setExam({ ...exam, questions: updatedQuestions });
  };

  //set image for each question
  const setImage = (file) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index].image = file;
    setExam({ ...exam, questions: updatedQuestions });
  };

  //set image for each choice
  const setChoiceImage = (choiceIndex, file) => {
    const updatedQuestions = [...exam.questions];
    if (!updatedQuestions[index].choiceImages) {
      updatedQuestions[index].choiceImages = {};
    }
    updatedQuestions[index].choiceImages[choiceIndex] = file;
    setExam({ ...exam, questions: updatedQuestions });
  };

  return (
    <>
      <div className="grid gap-[10px]">
        <div className="flex justify-between align-middle pt-[20px]">
          <h4 className="text-[18px] font-bold">{`Question ${index + 1}`}</h4>
          <div className='flex gap-[20px]'>
            {/* add default score */}
            <div className='flex gap-[10px] items-center'>
              <h4>Score: </h4>
              <input
                type="number"
                placeholder='-'
                className='input input-bordered w-[100px] h-[40px]'
                value={question.score}
                onChange={handleScoreChange}
              />
            </div>
            {/* detele question */}
            <button onClick={() => onDeleteQuestion(index)}>
              <FontAwesomeIcon icon={faTrash} className="text-[#864E41]" />
            </button>
          </div>
        </div>
        {/* question problem */}
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
        {/* question image */}
        <QuestionImageUploader setImage={setImage} />
        {/* question problem type selecter */}
        <select
          className="w-[200px] border rounded-lg p-[7px]"
          value={question.type}
          onChange={(e) => {
            const updatedQuestions = [...exam.questions];
            updatedQuestions[index].type = e.target.value;
            if (e.target.value === "checklist") {
              updatedQuestions[index].answer = [];
            } else {
              updatedQuestions[index].answer = "";
            }
            setExam({ ...exam, questions: updatedQuestions });
          }}
        >
          <option value="multipleChoice">Multiple Choice</option>
          <option value="checklist">Checklist</option>
          <option value="essay">Essay</option>
        </select>
        {/* question choice map for each type */}
        {question.type === "multipleChoice" && (
          <>
            {question.options.map((option, i) => (
              <div key={i} className="flex flex-col gap-[10px]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-[10px] items-center">
                    <input
                      className="radio checked:bg-[#C76650]"
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={question.answer === option}
                      onChange={() => handleAnswerChange(option)}
                    />
                    {option}
                  </div>
                  <div className="flex items-center">
                    {/* set image for each choice */}
                    <ChoiceImageUploader setChoiceImage={(file) => setChoiceImage(i, file)} />
                    {/* delete choice */}
                    <button onClick={() => deleteChoice(option)} className='ml-[30px]'>
                      <FontAwesomeIcon icon={faMinus} className="text-[20px]" />
                    </button>
                  </div>
                </div>
                {question.choiceImages && question.choiceImages[i] && (
                  <img
                    src={URL.createObjectURL(question.choiceImages[i])}
                    alt="Choice Image"
                    className="w-[300px] h-auto mt-2"
                  />
                )}
              </div>
            ))}
            <Choice onAddChoice={addChoice} />
          </>
        )}

        {question.type === "checklist" && (
          <>
            {question.options.map((option, i) => (
              <div key={i} className="flex flex-col gap-[10px]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-[10px] items-center">
                    <input
                      className="checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]"
                      type="checkbox"
                      checked={question.answer.includes(option)}
                      onChange={() => handleChecklistAnswerChange(option)}
                    />
                    {option}
                  </div>
                  <div className="flex items-center">
                    {/* set image for each choice */}
                    <ChoiceImageUploader setChoiceImage={(file) => setChoiceImage(i, file)} />
                    {/* delete choice */}
                    <button onClick={() => deleteChoice(option)} className='ml-[30px]'>
                      <FontAwesomeIcon icon={faMinus} className="text-[20px]" />
                    </button>
                  </div>
                </div>
                {question.choiceImages && question.choiceImages[i] && (
                  <img
                    src={URL.createObjectURL(question.choiceImages[i])}
                    alt="Choice Image"
                    className="w-[300px] h-auto mt-2"
                  />
                )}
              </div>
            ))}
            <Choice onAddChoice={addChoice} />
          </>
        )}
      </div>
    </>
  );
}
