import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

function HelpButton() {
    return (
        <>
            <div className="flex flex-col items-center">
                <button className="bg-red-500 text-white p-5 rounded-full">
                    <FontAwesomeIcon className="w-6 h-6" icon={faQuestion} />
                </button>
                <h1>Help</h1>
            </div>


        </>
    )
}

export default HelpButton;