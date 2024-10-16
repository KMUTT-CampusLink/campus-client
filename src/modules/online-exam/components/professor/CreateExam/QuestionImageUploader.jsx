import { useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

// the component for uploading an image for a question
export default function QuestionImageUploader({ setImage }) {
    const hiddenFileInput = useRef(null);
    const [imageURL, setImageURL] = useState(null);

    //handle click event fot activate the file input
    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    //set the image and the image url
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        setImage(fileUploaded);
        setImageURL(URL.createObjectURL(fileUploaded));
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <button onClick={handleClick} className="text-[20px] flex align-middle">
                    <FontAwesomeIcon icon={faImage} />
                    <p className='text-[16px] pl-[10px]'>Add Question Picture</p>
                </button>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>
            {/* display the image */}
            {imageURL && <img src={imageURL} alt="Question Image" />}
        </>
    );
}
