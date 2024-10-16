import { useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

// the component for uploading an image for a choice
export default function ChoiceImageUploader({ setChoiceImage }) {
  const hiddenFileInput = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  //handle click event fot activate the file input
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  //set the image and the image url
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setChoiceImage(fileUploaded);
    setImageURL(URL.createObjectURL(fileUploaded));
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
    </div>
  );
}
