import { useEffect, useRef, useState } from "react";
import { useAddEnrollmentDetail } from "../services/mutations";
import Alert from "./Alert";

const SectionTablePopup = ({
  isOpen,
  onClose,
  sections,
  studentId,
  headId,
  onSectionAdded, // Receive the refetch callback
}) => {
  const popupRef = useRef();
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const mutation = useAddEnrollmentDetail();

  const handleAddEnrollment = async () => {
    const selectedSection = sections.find(
      (section) => section.section_id === selectedSectionId
    );
    if (selectedSection && selectedSection.seats_left > 0) {
      try {
        await mutation.mutateAsync({
          head_id: headId,
          student_id: studentId,
          section_id: selectedSectionId,
        });
      } catch (error) {
        // Check for 409 Conflict (Enrollment already exists)
        if (error.response?.status === 409) {
          setAlertMessage("You have already added this section.");
          setAlertSeverity("error");
          setIsAlertVisible(true);
        } else {
          setAlertMessage("Failed to add course. Please try again.");
          setAlertSeverity("error");
          setIsAlertVisible(true);
        }
      }
    } else {
      setAlertMessage("Cannot add section. No seats left.");
      setAlertSeverity("error");
      setIsAlertVisible(true);
    }
  };

  const handleClose = () => {
    mutation.reset();
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (mutation.isSuccess) {
      setAlertMessage("Course added successfully.");
      setAlertSeverity("success");
      setIsAlertVisible(true);
      onSectionAdded(); // Trigger the refetch when the section is successfully added
    } else if (mutation.isError) {
      setAlertMessage(
        "Failed to add course. You may have added this section already."
      );
      setAlertSeverity("error");
      setIsAlertVisible(true);
    }
  }, [mutation.isSuccess, mutation.isError, onSectionAdded]);

  useEffect(() => {
    if (isAlertVisible) {
      const timer = setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAlertVisible]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg p-6 overflow-auto max-w-full max-h-full"
      >
        <h2 className="text-lg font-bold mb-4">Section Details</h2>

        {/* Display Alert if visible */}
        {isAlertVisible && (
          <Alert
            severity={alertSeverity}
            message={alertMessage}
            onClose={() => setIsAlertVisible(false)}
          />
        )}

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#c3554e] text-white">
              <th className="py-2 px-4 border border-gray-300">Add</th>
              <th className="py-2 px-4 border border-gray-300">Section Name</th>
              <th className="py-2 px-4 border border-gray-300">Professors</th>
              <th className="py-2 px-4 border border-gray-300">Schedule</th>
              <th className="py-2 px-4 border border-gray-300">Room</th>
              <th className="py-2 px-4 border border-gray-300">Seats</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="py-2 px-4 text-center border border-gray-300 truncate">
                  <input
                    type="radio"
                    id={`section-${section.section_id}`}
                    name="section"
                    value={section.section_id}
                    onChange={() => setSelectedSectionId(section.section_id)}
                    checked={selectedSectionId === section.section_id}
                  />
                </td>
                <td className="py-2 px-4 border border-gray-300 truncate">
                  {section.section_name}
                </td>
                <td className="py-2 px-4 border border-gray-300 truncate">
                  {section.professor_names}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <div>{section.section_day}</div>
                  <div>{`${section.start_time} - ${section.end_time}`}</div>
                </td>
                <td className="py-2 px-4 border border-gray-300 truncate">
                  {section.room_name}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {section.seats_left}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h3 className="font-semibold text-lg font-georama">
            Course Information
          </h3>
          {sections.length > 0 && (
            <div>
              <p className="font-bold text-[#DC5A52]">
                <strong>Course Code:</strong> {sections[0].course_code}
              </p>
              <p>
                <strong>Course Name:</strong> {sections[0].course_name}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={handleAddEnrollment}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            disabled={mutation.isPending || !selectedSectionId}
          >
            {mutation.isPending ? "Adding..." : "Add Section"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionTablePopup;