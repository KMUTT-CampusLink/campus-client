import  { useState, useRef } from 'react';

function Searchresult({ result }) {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const reserveRef = useRef(null);

  const toggleComponent = () => {
      setIsComponentVisible(!isComponentVisible);
  };

  const handleClickOutside = (event) => {
      if (reserveRef.current && !reserveRef.current.contains(event.target)) {
          setIsComponentVisible(false);
      }
  };
  return (
    <>
   <div className="bg-white hover:bg-gray-200 py-2 flex items-center justify-center px-28 w-full" onClick={toggleComponent}>{result.name}</div>{isComponentVisible && (
                <div 
                    className="flex fixed inset-0 justify-center items-center bg-black bg-opacity-50"
                    onClick={handleClickOutside}
                >
                 </div>
            )}
  
    </>
  )
}

export default Searchresult