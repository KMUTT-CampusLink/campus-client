import { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionID } from "../../services/queries";

const TrCourseDescription = ({ sideOpen }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sec_id = queryParams.get("sec_id");

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  console.log(details);
  const description = details?.description;
  // const [isEditing, setIsEditing] = useState(false);
  // const [description, setDescription] = useState(details?.description);
  // const [tempDescription, setTempDescription] = useState(description);

  // const handleEditClick = () => {
  //   setTempDescription(description);
  //   setIsEditing(true);
  // };

  // const handleSaveClick = () => {
  //   setDescription(tempDescription);
  //   setIsEditing(false);
  // };

  // const handleCancelClick = () => {
  //   setIsEditing(false);
  // };

  // const handleDescriptionChange = (event) => {
  //   setTempDescription(event.target.value);
  // };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"description"} />
      <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 ">
        <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto">
          <div className="text-2xl font-bold pt-10 pb-3 text-[#ecb45e]">
            About Classroom
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Course: </span>
            {`${details?.course_code} ${details?.course_name}`}
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Lecturer:</span> Arjan {`${details?.lecturer}`}
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Time:</span> {`${details?.time}`}
            (Thursday)
          </div>
        </div>
      </div>

      <div className="py-8 w-full max-md:text-xs">
        <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto flex max-md:gap-3 gap-10 items-center mb-4">
          <div className="text-2xl font-bold text-[#ecb45e]">
            Course Description
          </div>
          {/* {isEditing ? (
            <div className="flex gap-2">
              <button
                className="bg-[#4caf50] text-white py-2 px-4 rounded hover:bg-[#3e8e41] transition duration-200"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="bg-red-700 text-white py-2 px-2 rounded hover:bg-[#d34b4b] transition duration-200"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="bg-[#ecb45e] text-white py-2 px-4 rounded hover:bg-[#d9a24b] transition duration-200"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
              Edit
            </button>
          )} */}
        </div>
        <div className="max-md:w-full max-md:px-2 w-3/4 mx-auto text-gray-700 leading-relaxed">
          {/* {isEditing ? (
            <textarea
              className="w-full border border-gray-300 rounded p-2 h-20"
              value={tempDescription}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p>{description}</p>
          )} */}
          <p>{description}</p>
        </div>
      </div>

      <div className="py-8 bg-white max-md:text-xs px-2">
        <div className="max-md:w-full w-3/4 mx-auto text-2xl font-bold text-[#ecb45e] mb-4">
          Learning Outcomes
        </div>
        <div className="max-md:w-full w-3/4 mx-auto text-gray-700 leading-relaxed">
          <ul className="list-disc list-inside">
            <li>Understand the architecture of modern computer systems.</li>
            <li>Analyze the functioning of the control unit and CPU.</li>
            <li>
              Apply Boolean algebra and digital logic in computing problems.
            </li>
            <li>Explore the design and organization of instruction sets.</li>
            <li>
              Evaluate the performance of different processor architectures.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrCourseDescription;
