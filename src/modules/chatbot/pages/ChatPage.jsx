import React, { useEffect, useRef, useState } from 'react';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import FAQs from '../components/chatPage/FAQs';
import MessageArea from '../components/chatPage/MessageArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance } from '../../../utils/axiosInstance';

const ChatPage = () => {
  const [dummyFaqs, setDummyFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonAble, setButtonAble] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [questions, setQuestions] = useState([]);
  const [dummyAns, setDummyAns] = useState([]);
  const [startChat, setStartChat] = useState(false);
  const textRef = useRef(null);
  const studentId = localStorage.getItem("studentId");
  
  const botImage = "chatbot/G12_Bot_Logo_Transparent.png";

  useEffect(() => {
    const fetchNextQuestions = async() => {
      try{
        const response = await axiosInstance.get('/botastra/faqs');
        const questions = response.data.map(faq => faq.question);
        setDummyFaqs(questions);
        setLoading(false);
      }
      catch(error){
          setError(error.message);
          setLoading(false);
      }
    }
    fetchNextQuestions();
  }, [])

  function autoResize() {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to allow shrinking
    textarea.style.height = `${textarea.scrollHeight}px`;
    if(textarea.value) setButtonAble(true);
    else setButtonAble(false);
  }

  const askQuestion = async (e) => {
    if (e) e.preventDefault();
    const input = textRef.current.value.trim();
    textRef.current.value = "";
    setButtonAble(false);
    if (input.length > 0) {
      if(dummyAns.length < questions.length) dummyAns.push("I'm sorry, I cannot understand what you were saying.");
      setStartChat(true);
      setQuestions([...questions, input]);
      try {
        const reply = await axiosInstance.post("/botastra/message", {message : input});
        const ans = reply.data.replyText;
        const nextQuestions = reply.data.nextQuestions;
        if(nextQuestions.length > 0){
          let nextQs = [];
          nextQuestions.map((que, index) => {
            nextQs[index] = que.next_question;
          })
          setDummyFaqs(nextQs);
        }
        setDummyAns([...dummyAns, ans]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if(error){
    return <div className='grid place-content-center items-center h-[100vh]' style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165, 1), rgba(248, 248, 248, 1)"}}>
      <p className='text-3xl text-red-700'>Error: {error}</p> 
    </div>
  }

  return (
    <div className = " min-w-screen min-h-screen" style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165, 1), rgba(248, 248, 248, 1)"}}>
        <NavBar />
        {/* main div for chat */}
        <div className = {` mx-auto max-w-7xl pt-12 sm:pt-10 md:pt-6 pb-6 sm:pb-4 md:pb-0 w-full sm:w-[90%] h-screen rounded-t-xl flex flex-col items-center justify-end`}>
            {/* messaging area  */}
            <div className= {` w-full sm:w-[90%] flex ${startChat? `gap-0 pt-0 mt-10 pb-0 mb-0 flex-col-reverse h-[100%] `: ` h-[80%] gap-6 lg:gap-8 xl:gap-10 flex-col py-0 `} justify-start`}>
                {/* bot profile div  */}
                <div className= {`${startChat ? `hidden`: `visible`} w-full h-fit flex justify-center items-center lg:mt-6 `}>
                    <img src={botImage} alt="batman" className="object-contain w-[6rem] md:w-[8rem] lg:w-[9rem] h-auto rounded-full"/>
                </div>
                {/* faqs div  */}
                {loading ? <div>
                    <p className="text-center font-bold text-2xl sm:text-4xl md:text-5xl">Loading FAQs...</p>
                </div> : <div className={` w-full ${startChat? `min-h-[8%] p-0`: `h-[60%] lg:h-[55%] xl:h-[50%] pb-0`} flex justify-center items-start`}>
                    <div className={` ${startChat ? `p-1 px-4 pl-8 sm:px-2 md:px-6 lg:px-14 gap-0` :`gap-4 flex flex-col p-6 px-14 sm:px-10 md:py-8 lg:py-10` }`}>
                        <FAQs textRef={textRef} dummyFaqs = {dummyFaqs} startChat = {startChat} setButtonAble = {setButtonAble}/>
                    </div>
                </div>}
                {/* messaging area */}
                {startChat ? 
                    <MessageArea questions = {questions} dummyAns = {dummyAns} profilePic = {botImage}/> : <></>
                }
            </div>
            {/* chat input area  */}
            <div className=' w-full h-fit flex flex-col justify-center items-center pb-0 lg:pb-2 mb-0'>
                <form action="#" className={`bg-[white] shadow-lg w-4/5 min-h-[3rem] sm:min-h-[4rem] max-h-[3.5rem] sm:max-h-[4rem] md:max-h-[4.5rem] rounded-[1.75rem] flex flex-row justify-between px-4 py-1 sm:py-2 gap-4 sm:pt-1 md:pt-2`}>
                    <div className='flex w-full h-fit'>
                        <textarea
                        placeholder="How may I help you..."
                        className="w-full px-4 py-3 rounded-xl min-h-[2rem] sm:min-h-[2.5rem] max-h-[3rem] sm:max-h-[3.5rem]fasdf border-none outline-none font-semibold text-black
                        text-sm sm:text-base placeholder-black placeholder-opacity-65
                        resize-none overflow-hidden bg-[white]"
                        onChange={autoResize}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && !e.ctrlKey && e.target.value) {
                                e.preventDefault();
                                askQuestion(e);
                            }
                        }}
                        ref={textRef}
                        ></textarea>
                    </div>
                    <button type="submit" onClick={askQuestion} disabled={!buttonAble} >
                        <FontAwesomeIcon icon={faPaperPlane} className={`w-6 sm:w-8 h-auto mr-2 sm:mr-4 ${buttonAble? `opacity-100` : `opacity-50`}`}/>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ChatPage;