import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FeedbackPopup = ({ onClose, onSubmit, studentName }) => {
    const [decimalValue, setDecimalValue] = useState(""); // Decimal input state
    const [textValue, setTextValue] = useState(""); // Text input state
    const [warning, setWarning] = useState(""); // Warning message

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedValue = parseFloat(decimalValue);

        // Validation: Ensure both fields are filled
        if (!decimalValue.trim() || isNaN(parsedValue)) {
            setWarning("Please enter a valid score (e.g., 0 to 10).");
            return;
        }

        if (parsedValue < 0 || parsedValue > 10) {
            setWarning("Score must be between 0 and 10.");
            return;
        }

        if (!textValue.trim()) {
            setWarning("Please provide text feedback.");
            return;
        }

        // Submit the data
        onSubmit({
            decimalValue: parsedValue,
            textValue,
        });

        // Reset states and close the popup
        setDecimalValue("");
        setTextValue("");
        setWarning("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    <span className="block text-[#ecb45e]">{studentName}</span>
                    <span className="text-lg font-medium text-gray-600">Provide Feedback</span>
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Decimal Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Score (Decimal) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={decimalValue}
                            onChange={(e) => setDecimalValue(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ecb45e] placeholder-gray-400"
                            placeholder="Enter a score between 0 and 10 (e.g., 9.5)"
                            required
                        />
                    </div>

                    {/* Text Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Feedback <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ecb45e] placeholder-gray-400"
                            placeholder="Enter your feedback here"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* Warning Message */}
                    {warning && <p className="text-red-500 text-sm">{warning}</p>}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#ecb45e] text-white px-4 py-2 rounded hover:bg-[#d9a24b]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPopup;
    