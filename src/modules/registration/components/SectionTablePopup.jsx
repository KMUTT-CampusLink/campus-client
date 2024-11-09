import { useEffect, useRef, useState } from "react";
import { useAddEnrollmentDetail } from "../services/mutations";
import popToast from "../../../utils/popToast";
import { useSectionByCourseCode } from "../services/queries";
const SectionTablePopup = ({
  isOpen,
  onClose,
  courseCode,
  studentId,
  headId,
}) => {
  const popupRef = useRef();
  const { data: sectionData, refetch: refetchSections } =
    useSectionByCourseCode(courseCode);
  const [sections, setSelectedSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
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
          popToast("You have already added this section.", "error");
        }
      }
    } else {
      popToast("Cannot add section. No seats left.", "error");
    }
  };

  useEffect(() => {
    if (sectionData) {
      setSelectedSections(sectionData);
    }
  }, [sectionData, courseCode]); // Re-run when sectionData or courseCode changes

  const handleClose = () => {
    if (mutation.isLoading) return; // Prevent closing while loading
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
      popToast("Course added successfully.", "success");
      mutation.reset(); // Reset mutation state after success
    } else if (mutation.isError) {
      popToast(
        "Failed to add course. You may have added this section or course already.",
        "error"
      );
      mutation.reset(); // Reset mutation state after error
    }
  }, [mutation.isSuccess, mutation.isError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg p-6 overflow-auto max-w-full max-h-full"
      >
        <h2 className="text-lg font-bold mb-4">Section Details</h2>

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
            {sections && sections.length > 0 ? (
              sections.map((section, index) => (
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-4 text-center text-gray-500 border border-gray-300"
                >
                  No sections available for this course.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4">
          <h3 className="font-semibold text-lg font-georama">
            Course Information
          </h3>
          {sections.length > 0 && (
            <div>
              <p className="text-[#DC5A52]">
                <strong className="text-black">Course Code:</strong>{" "}
                <strong>{sections[0].course_code}</strong>
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
            aria-label="Close popup"
          >
            Close
          </button>
          <button
            onClick={handleAddEnrollment}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            disabled={mutation.isLoading || !selectedSectionId}
            aria-label="Add selected section"
          >
            {mutation.isLoading ? "Adding..." : "Add Section"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionTablePopup;
