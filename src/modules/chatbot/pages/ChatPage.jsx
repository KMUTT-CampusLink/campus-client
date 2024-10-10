import React, { useRef, useState } from 'react';
import NavBar from '../../registration/components/NavBarComponents/NavBar';
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
    <div className = " w-full min-h-screen">
        <NavBar />
        {/* main div for chat */}
        <div className = {`mx-auto max-w-7xl pt-20 pb-6 w-full h-[100vh] rounded-t-xl flex flex-col justify-between`}>
            {/* messaging area  */}
            <div className=' w-full flex flex-col justify-around gap-6'>
                {/* bot profile div  */}
                <div className= {`${startChat ? `hidden`: `visible`} w-full h-[8rem] flex justify-center items-center `}>
                    <img src={batman} alt="batman" className="object-contain w-[6rem] h-[6rem] rounded-full"/>
                </div>
                {/* faqs div  */}
                <div className={`w-full  ${startChat? `h-[6rem] `: `h-[10rem]`} flex justify-center items-center`}>
                    <div className={`p-12 gap-5 flex flex-col `}>
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
            <div className='w-full h-fit flex flex-col justify-center items-center'>
                <div className={`bg-[#D9D9D9] shadow-lg w-[30rem] min-h-[1rem] max-h-fit rounded-2xl flex flex-row justify-between px-4 py-1 gap-4`}>
                    <div className='flex w-full h-fit'>
                        <textarea
                        placeholder="How may I help you..."
                        className="w-full px-4 py-3 rounded-xl min-h-[2rem] max-h-[3.25rem] border-none outline-none font-bold text-[#7F483C] placeholder-[#7F483C] placeholder-opacity-65
                        resize-none overflow-hidden bg-[#D9D9D9]"
                        onChange={autoResize}
                        ref={textRef}
                        ></textarea>
                        {/* focus:border-orange-200 */}
                    </div>
                    <button onClick={askQuestion}>
                        <svg className='w-14 h-auto' viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f3e2e2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.44"></g><g id="SVGRepo_iconCarrier"> <path d="M10 14L13 21L20 4L3 11L6.5 12.5" stroke="#864E41" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage;