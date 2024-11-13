import { useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

// the component for uploading an image for a choice
export default function ChoiceImageUploader({ setChoiceImage, questionIndex, choiceIndex }) {
  const hiddenFileInput = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImageURL(URL.createObjectURL(fileUploaded));
    
    // Send the file to `setChoiceImage` so it can handle the FormData creation
    setChoiceImage(questionIndex, choiceIndex, fileUploaded);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <button onClick={handleClick} className="text-[20px]">
          <FontAwesomeIcon icon={faImage} />
        </button>
        <input 
          type="file" 
          ref={hiddenFileInput} 
          onChange={handleChange} 
          className="hidden" 
        />
      </div>
      {imageURL && (
        <img src={imageURL} alt="Choice Preview" className="w-[100px] h-auto mt-2" />
      )}
    </div>
  );
}
