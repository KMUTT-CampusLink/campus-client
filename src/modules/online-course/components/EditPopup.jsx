import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const EditPopup = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [editForm, setEditForm] = useState({
        title: initialData.title || "",
        videoFile: null,
        materialFiles: [],
    });

    const handleInputChange = (e) => {
        const { name, files, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleFileChange = (e) => {
        setEditForm((prev) => ({
            ...prev,
            materialFiles: Array.from(e.target.files),
        }));
    };

    const handleSubmit = () => {
        onSubmit(editForm);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Edit Material</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Video Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={editForm.title}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Video File */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Replace Video (Optional)
                        </label>
                        <input
                            type="file"
                            name="videoFile"
                            onChange={handleInputChange}
                            className="w-full"
                            accept="video/mp4, video/ogg, video/webm"
                        />
                    </div>

                    {/* Material Files */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Replace Files (Optional)
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full"
                            accept="application/pdf,image/*"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
