import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackBTN() {
    const navigate = useNavigate();
    return (
        <div className="py-[15px]">
            <button className="hover:underline hover:underline-offset-2" onClick={() => {navigate(-1)}}><FontAwesomeIcon icon={faChevronLeft} className="pr-[5px]" />Back</button>
        </div>
    )
}
