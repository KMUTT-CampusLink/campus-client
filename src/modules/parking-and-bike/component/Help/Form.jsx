
function Form() {
    return (
        <>

        <div className="flex flex-col justify-start w-max-24">
        <h1 className="text-red-500 font-bold text-3xl">Get in Touch</h1>
            <div className="font-semibold text-sm text-black">Any question or remark?</div>
            <div className="font-semibold  text-sm">Let us know</div>
        
           <br />
            <form className="flex flex-col gap-5" action="get">
                <input type="text"
                 placeholder="Enter your name"
                 className="max-w-56 text-sm p-2 border border-gray-300 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input type="text"
                  placeholder="Enter your email"
                  className="max-w-56 text-sm p-2 border border-gray-300 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  
                <input  type="text"
        placeholder="Type your message here..."
        className="border border-gray-300 rounded-lg pb-24 p-1 w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <button className="bg-red-500 text-white px-0 py-2 rounded-lg hover:bg-red-600 transition">Submit</button>
            </form>
            </div>
        </>)
}

export default Form