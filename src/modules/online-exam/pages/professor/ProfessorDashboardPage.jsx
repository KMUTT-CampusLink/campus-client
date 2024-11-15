import { useEffect, useState } from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Question from "../../components/professor/Dashboard/Question";

import { dashboard } from "../../services/apis/professerApi";
import { useParams } from "react-router-dom";

export default function ProfessorDashboardPage() {
  const [participant, setParticipant] = useState(0);
  const { examId } = useParams();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState(0);
  const [pass, setPass] = useState(0);
  const [fail, setFail] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingError, setIsFetchingError] = useState(false);
  const [mostIncorrectQuestion, setMostIncorrectQuestion] = useState([]);
  const getData = async () => {
    try {
      const response = (await dashboard(examId)).data.data;
      console.log(response);
      setParticipant(response.participant);
      setMin(response.min);
      setMax(response.max);
      setAvg(response.avg);
      setPass(response.pass);
      setFail(response.fail);
      setMostIncorrectQuestion(response.mostIncorrectQuestion);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      setIsFetchingError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavBar />
      <div className="px-[26px] py-[35px] lg:px-[200px] pt-20">
        <p className="font-bold text-[#D4A015] text-[22px] lg:text-[30px] py-4 pb-7">
          Dashboard
        </p>
        <hr className="border" />
        {isFetching ? (
          <div>Loading ...</div>
        ) : isFetchingError ? (
          <div>Fetching Error</div>
        ) : (
          <div className=" my-10 flex flex-col gap-[50px]">
            <div className="mx-[50px]">
              <p>Total participant : {participant}</p>
              <p>Min : {min}</p>
              <p>Max : {max}</p>
              <p>Average : {avg}</p>
              <p>Passed : {pass}</p>
              <p>Failed : {fail}</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <p>The most incorrect question :</p>
              {mostIncorrectQuestion.map((item, index) => (
                <Question
                  key={index}
                  questionNo={item.id}
                  question={item.title}
                  choice={item.choice_text}
                  type={item.type}
                  handleAnswer={() => {}}
                  className="w-[67%] h-auto"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
