import React, { useRef, useState } from 'react';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import FAQs from '../components/chatPage/FAQs';
import MessageArea from '../components/chatPage/MessageArea';

const ChatPage = () => {
  const dummyFaqs = ["What is your name?", "Who are you?", "How do I sign up for the event?", "Where is SIT?"];
  const dummyAns = ["Hello, My name is AstraBot. lorem ipsum asdfasdf adfsdaf adfasdfa adsfadsf asdfadfa adfadsfa fadsfadsf adfadsf adfadsfa asddfasdfa adfadfadf asdfa sdfasdf adsf asdf asdf adf adf ad fads f asdf adsf adsfasd fasdfasd fa sdfads fa sdf asdf adsf ad fad f asdf ads fad f adsf asdf sda f dsaf a dsf sad f asdf ads f adsf ads fa sdf sda f sadf ads f asdf ads f sadf asdf asd f", "Hello, My name is AstraBot.", "I have no idea at the moment.", "It is besides the library."];

  const [messagesInd, setMessagesInd] = useState([]);

  const [startChat, setStartChat] = useState(false);
  const textRef = useRef(null);

  const batman = "https://pbs.twimg.com/profile_images/1816958428771749888/f49y3HRM_400x400.png";

  function autoResize() {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to allow shrinking
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function askQuestion(){
    setStartChat(true);
    const inp = textRef.current.value;
    const ind = dummyFaqs.indexOf(inp.trim());
    
    setMessagesInd([...messagesInd, ind]);
    textRef.current.value = "";
  }

  return (
    <div className = " min-w-screen min-h-screen">
        <NavBar />
        {/* main div for chat */}
        <div className = {` mx-auto max-w-7xl pt-16 sm:pt-10 md:pt-8 pb-6 sm:pb-4 md:pb-0 w-full sm:w-[90%] h-screen rounded-t-xl flex flex-col items-center justify-between`}>
            {/* messaging area  */}
            <div className= { ` w-full sm:w-5/6 flex flex-col h-[80%] ${startChat? `justify-between py-0 sm:py-2 md:py-4`: `justify-around py-8 sm:py-12 md:py-16`} `}>
                {/* bot profile div  */}
                <div className= {`${startChat ? `hidden`: `visible`} w-full h-fit flex justify-center items-center `}>
                    <img src={batman} alt="batman" className="object-contain w-[6rem] sm:w-[10rem] h-auto rounded-full"/>
                </div>
                {/* faqs div  */}
                <div className={` w-full ${startChat? `min-h-[10%] p-0`: `h-[60%] sm:h-[65%] md:h-[70%] p-10`} flex justify-center items-center`}>
                    <div className={`gap-5 flex flex-col p-8 sm:p-10 md:p-12`}>
                        <p className = {`${startChat ? `hidden` : `visible`} font-bold text-xl`}>Try asking these questions!</p>
                        <FAQs textRef={textRef} dummyFaqs = {dummyFaqs} startChat = {startChat}/>
                    </div>
                </div> 

                {/* messaging area */}
                {startChat ? 
                    <MessageArea messagesInd = {messagesInd} dummyFaqs = {dummyFaqs} dummyAns = {dummyAns} profilePic = {batman}/> : <></>
                }
            </div>
            {/* chat input area  */}
            <div className=' w-full h-fit flex flex-col justify-center items-center sm:pb-6 md:pb-8'>
                <div className={`bg-[#D9D9D9] shadow-lg w-4/5 min-h-[1rem] max-h-fit rounded-[1.75rem] flex flex-row justify-between px-4 py-1 gap-4 `}>
                    <div className='flex w-full h-fit'>
                        <textarea
                        placeholder="How may I help you..."
                        className="w-full px-4 py-3 rounded-xl min-h-[1rem] sm:min-h-[1.5rem] md:min-h-[2rem] max-h-[3.75rem] sm:max-h-[4rem] border-none outline-none font-bold text-[#7F483C]
                        text-md sm:text-lg placeholder-[#7F483C] placeholder-opacity-65
                        resize-none overflow-hidden bg-[#D9D9D9]"
                        onChange={autoResize}
                        ref={textRef}
                        ></textarea>
                    </div>
                    <button onClick={askQuestion}>
                        <svg className='w-14 sm:w-16 md:w-18 h-auto' viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f3e2e2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.44"></g><g id="SVGRepo_iconCarrier"> <path d="M10 14L13 21L20 4L3 11L6.5 12.5" stroke="#864E41" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage;