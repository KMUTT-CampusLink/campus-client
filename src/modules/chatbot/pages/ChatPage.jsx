import React, { useEffect, useRef, useState } from 'react';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import FAQs from '../components/chatPage/FAQs';
import MessageArea from '../components/chatPage/MessageArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../services/axiosInstance';

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

  const botImage = "chatbot/botImage.jpg";
  useEffect(() => {
    const fetchFaqs = async () => {
        try{
            const response = await axiosInstance.get('/faqs');
            const questions = response.data.map(faq => faq.question);
            setDummyFaqs(questions);
            setLoading(false);
        }
        catch(error){
            setError(error.message);
            setLoading(false);
        }
    }
    const generateSessionId = () => {
      setSessionId(Math.random().toString(36).substring(7));
    }
    generateSessionId();
    fetchFaqs();
  }, [])

  function autoResize(e) {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to allow shrinking
    textarea.style.height = `${textarea.scrollHeight}px`;
    if(textarea.value) setButtonAble(true);
    else setButtonAble(false);
  }

  const askQuestion = async (e) => {
    // Prevent the default form submit behavior if 'e' is defined (it's a React event handler)
    if (e) e.preventDefault();
    const input = textRef.current.value.trim();
    textRef.current.value = "";
    setButtonAble(false);
    if (input.length > 0) {
      setStartChat(true);
      setQuestions([...questions, input]);
      try {
        const reply = await axiosInstance.post("/message", {message : input, sessionId: sessionId} );
        console.log(reply.data.replyMessage);
        const ans = reply.data.replyMessage;
        setDummyAns([...dummyAns, ans]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <div className = " min-w-screen min-h-screen">
        <NavBar />
        {/* main div for chat */}
        <div className = {` mx-auto max-w-7xl pt-16 sm:pt-10 md:pt-6 pb-6 sm:pb-4 md:pb-0 w-full sm:w-[90%] h-screen rounded-t-xl flex flex-col items-center justify-between`}>
            {/* messaging area  */}
            <div className= { ` w-full sm:w-5/6 flex flex-col h-[80%] ${startChat? `justify-between py-0 sm:py-2 md:py-4`: `justify-around py-8 sm:py-12 md:py-16`} `}>
                {/* bot profile div  */}
                <div className= {`${startChat ? `hidden`: `visible`} w-full h-fit flex justify-center items-center `}>
                    <img src={botImage} alt="batman" className="object-contain w-[6rem] sm:w-[10rem] h-auto rounded-full"/>
                </div>
                {/* faqs div  */}
                {loading ? <div>
                    <p className="text-center font-bold text-2xl sm:text-4xl md:text-5xl">Loading FAQs...</p>
                </div> : <div className={` w-full ${startChat? `min-h-[10%] p-0`: `h-[60%] sm:h-[65%] md:h-[70%] p-10`} flex justify-center items-center`}>
                    <div className={`gap-5 flex flex-col p-8 sm:p-10`}>
                        <p className = {`${startChat ? `hidden` : `visible`} font-bold text-xl`}>Try asking these questions!</p>
                        <FAQs textRef={textRef} dummyFaqs = {dummyFaqs} startChat = {startChat} setButtonAble = {setButtonAble}/>
                    </div>
                </div>}
                

                {/* messaging area */}
                {startChat ? 
                    <MessageArea questions = {questions} dummyAns = {dummyAns} profilePic = {botImage}/> : <></>
                }
            </div>
            {/* chat input area  */}
            <div className=' w-full h-fit flex flex-col justify-center items-center sm:pb-6 md:pb-8'>
                <form action="#" className={`bg-[#D9D9D9] shadow-lg w-4/5 min-h-[1rem] max-h-fit rounded-[1.75rem] flex flex-row justify-between px-4 py-1 gap-4 `}>
                    <div className='flex w-full h-fit'>
                        <textarea
                        placeholder="How may I help you..."
                        className="w-full px-4 py-3 rounded-xl min-h-[1rem] sm:min-h-[1.5rem] max-h-[3.75rem] sm:max-h-[4rem] border-none outline-none font-semibold text-black
                        text-md sm:text-lg placeholder-black placeholder-opacity-65
                        resize-none overflow-hidden bg-[#D9D9D9]"
                        onChange={autoResize}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.ctrlKey && e.target.value) {
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