import React, { useState } from "react";

export default function Submit({ start, end, mark }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const startTime = new Date(start);
    const endTime = new Date(end);

    if (endTime < startTime) {
      setAlertMessage("Error: End time cannot be less than start time.");
      setAlertVisible(true);
      setIsSubmit(false);
    } else if (start === "" || end === "") {
      setAlertMessage("Error: Start time and end time cannot be empty.");
      setAlertVisible(true);
      setIsSubmit(false);
    } else if (mark === "") {
      setAlertMessage("Error: Passing marks cannot be empty.");
      setAlertVisible(true);
      setIsSubmit(false);
    } else {
      setAlertMessage("Message sent successfully.");
      setAlertVisible(true);
      setIsSubmit(true);
    }

    // Optionally, you can hide the alert after a few seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Alert will disappear after 3 seconds
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-[#7F483C] p-[10px] px-[20px] text-[white] btn hover:bg-[#653328]"
        >
          Submit change
        </button>
      </form>

      {alertVisible && (
        <div className="toast toast-center">
          <div
            className={`alert ${isSubmit ? "alert-success" : "alert-error"}`}
          >
            <span className="text-white">{alertMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
