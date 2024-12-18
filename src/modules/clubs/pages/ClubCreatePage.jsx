import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ClubCreateMemberAddPage from "./ClubCreateMemberAddPage";
import { axiosInstance } from "../../../utils/axiosInstance";
import { z } from "zod";

const schema = z.object({
  clubName: z.string().nonempty({ message: "Club name is required" }),
  clubDescription: z
    .string()
    .nonempty({ message: "Club description is required" }),
  clubDetails: z.string().nonempty({ message: "Club details are required" }),
  buildingId: z
    .string()
    .nonempty({ message: "Building selection is required" }),
  members: z
    .array(z.string())
    .min(3, { message: "At least 3 members are required" }),
  //clubImage: z.instanceof(File).optional(),
  clubImage: z
    .instanceof(File)
    .refine((file) => file?.length !== 0, "File is required")
    .refine((file) => file?.size < 5 * 1024 * 1024, "Poster file at most 5MB")
    // .refine((file) => {
    //   const fileType = file[0]?.type.split("/").pop();
    //   const allowedExtension = /^(jpe?g|png|gif|webp|avif)$/; //regexfunction which will validate according to user input
    //   return allowedExtension.test(fileType); //only return ture or false
    // }, "Invalid file type"),
    .refine((file) => {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/avif",
      ];
      return allowedMimeTypes.includes(file.type); // Match MIME type
    }, "Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, AVIF."),
});

function ClubCreatePage() {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubDetails, setClubDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedMembers, setAddedMembers] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [memberError, setMemberError] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [buildingId, setBuildingId] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate
  const MIN_MEMBERS = 3;

  const empId = localStorage.getItem("empId");
  const stdId = localStorage.getItem("studentId");
  const memberId = empId === "null" ? stdId : empId;

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axiosInstance.get("/clubs/buildings");
        setBuildings(response.data.data);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };
    fetchBuildings();
  }, []);

  // Fetch student and professor data from the backend when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const stdResponse = await axiosInstance.get("/clubs/students");
        const profResponse = await axiosInstance.get("/clubs/professors");

        const formattedMembers = [
          ...stdResponse.data.data.map((student) => ({
            id: student.id,
            name: `${student.firstname ?? ""} ${student.midname ?? ""} ${
              student.lastname ?? ""
            }`.trim(),
            image: student.image,
          })),
          ...profResponse.data.data.map((professor) => ({
            id: professor.id,
            name: `Prof. ${professor.firstname ?? ""} ${
              professor.midname ?? ""
            } ${professor.lastname ?? ""}`.trim(),
            image: professor.image,
          })),
        ];

        // Filter out the logged-in user
        const filteredMembers = formattedMembers.filter(
          (member) => member.id !== memberId
        );

        setMemberList(filteredMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers(); // Fetch members when component mounts
  }, []);

  const handleChange = (field, value) => {
    // Clear the error for the specific field
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    // Update the state based on the field being updated
    switch (field) {
      case "clubName":
        setClubName(value);
        break;
      case "clubDescription":
        setClubDescription(value);
        break;
      case "clubDetails":
        setClubDetails(value);
        break;
      case "buildingId":
        setBuildingId(value);
        break;
      default:
        break;
    }
  };

  const validateMembers = (members) => {
    if (members.length < MIN_MEMBERS) {
      setMemberError(
        `At least ${MIN_MEMBERS} members are required to create a club.`
      );
    } else {
      setMemberError("");
    }
  };

  useEffect(() => {
    validateMembers(addedMembers);
  }, [addedMembers]);

  const handleAddMembers = (newAddedIds) => {
    setAddedMembers(newAddedIds);
  };

  const handleRemoveMember = (memberId) => {
    const updatedMembers = addedMembers.filter((id) => id !== memberId);
    setAddedMembers(updatedMembers);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null); // Set to null if no file is selected
    if (file) {
      console.log("File selected:", file); // Debugging info
    }
    setErrors((prevErrors) => ({ ...prevErrors, clubImage: "" })); // Clear errors
  };

  const validateAndSubmit = async () => {
    const formData = {
      clubName,
      clubDescription,
      clubDetails,
      buildingId,
      members: addedMembers,
      clubImage: selectedFile,
    };

    try {
      schema.parse(formData);
      setErrors({});
      setMemberError("");

      const submitData = new FormData();
      submitData.append("clubName", clubName);
      submitData.append("clubDescription", clubDescription);
      submitData.append("clubDetails", clubDetails);
      submitData.append("buildingId", buildingId);
      submitData.append("members", JSON.stringify(addedMembers));
      if (selectedFile) {
        submitData.append("clubImage", selectedFile);
      }

      const response = await axiosInstance.post("/clubs/create", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Club created successfully!");

        // Navigate to the club's home page after successful creation
        navigate("/clubs/");

        setClubName("");
        setClubDescription("");
        setClubDetails("");
        setAddedMembers([]);
        setSelectedFile(null);
        setBuildingId("");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors into a usable error object for displaying messages
        const formErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formErrors); // Set errors state with validation messages
      } else {
        console.error("Error creating club:", error);
        alert("An error occurred while creating the club.");
      }
    }
  };

  return (
    <>
      <div
        className="bg-white min-h-screen rounded-lg sm:p-5"
        encType="multipart/form-data"
      >
        {/* Club Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-14">
          {/* Left Column */}
          <div className="md:pl-20 pl-10 pr-10">
            <div className="mb-4">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Name <span className="text-red-500">*</span>
              </label>

              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                <input
                  id="clubname"
                  type="text"
                  value={clubName}
                  onChange={(e) => handleChange("clubName", e.target.value)}
                  placeholder="Enter club name"
                  className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.clubName && (
                <p className="text-red-500">{errors.clubName}</p>
              )}
            </div>
            <div className="mb-4 pt-3">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                  <input
                    id="clubdescription"
                    type="text"
                    value={clubDescription}
                    onChange={(e) =>
                      handleChange("clubDescription", e.target.value)
                    }
                    placeholder="Enter club description"
                    className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.clubDescription && (
                  <p className="text-red-500">{errors.clubDescription}</p>
                )}
              </div>
            </div>
            {/* Club Image Upload */}
            <div className="mb-4 pt-3">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Image <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset sm:max-w-lg">
                {/* Display selected file name or "No file selected" */}
                <span className="flex-1 inline-flex items-center px-3 py-2 text-gray-500 text-sm bg-transparent border-r border-gray-300">
                  {selectedFile ? selectedFile.name : "No file selected"}
                </span>

                {/*error message */}
                {errors.clubImage && (
                  <p className="text-red-500">{errors.clubImage}</p>
                )}

                {/* File Upload Button */}
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-r-lg bg-orange-400 text-white font-medium py-2 px-4 hover:bg-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                >
                  <span>Select File</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={onFileChange}
                  />
                </label>
              </div>
            </div>
            <div className="mb-4 pt-3">
              <label
                className="block text-lg font-medium leading-6 text-gray-900 mb-3"
                htmlFor="building"
              >
                Select Building: <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                <select
                  id="building"
                  value={buildingId}
                  onChange={(e) => handleChange("buildingId", e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a building</option>
                  {buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.buildingId && (
                <p className="text-red-500">{errors.buildingId}</p>
              )}
            </div>
            <div className="pt-3">
              <button
                className="bg-orange-400 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-600"
                onClick={() => setIsModalOpen(true)}
                type="button"
              >
                Add Member
              </button>
              {memberError && <p className="text-red-500">{memberError}</p>}
            </div>
            {/* Member List Modal */}
            {/* Pass the student list and addedMembers to the child */}
            {isModalOpen && (
              <ClubCreateMemberAddPage
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddMembers={handleAddMembers} // Pass function to add members
                addedMembers={addedMembers} // Pass added members to the modal
                memberList={memberList} // Dynamic student list
              />
            )}
            {/* Display Member List */}
            <div className="mt-5">
              <h2 className="block text-lg font-medium leading-6 text-gray-900">
                Member List
              </h2>
              <div className="mt-4 flex flex-wrap space-x-2">
                {addedMembers.map((memberId) => {
                  const member = memberList.find((m) => m.id === memberId); // Find the member by ID
                  return (
                    <div
                      key={memberId}
                      className="relative border border-gray-300 p-2 rounded-md bg-gray-100"
                    >
                      <span className="text-gray-800">{member?.name}</span>
                      <button
                        className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-3 h-3 flex items-center justify-center rounded-full border border-black text-black hover:bg-gray-300"
                        onClick={() => handleRemoveMember(memberId)}
                      >
                        {" "}
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="pl-10 pr-10">
            <div className="mb-4">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Details <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                  <textarea
                    id="clubdetail"
                    rows={8}
                    value={clubDetails}
                    onChange={(e) =>
                      handleChange("clubDetails", e.target.value)
                    }
                    className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter club details"
                  />
                </div>
              </div>
              {errors.clubDetails && (
                <p className="text-red-500">{errors.clubDetails}</p>
              )}
            </div>
            <div className="mt-4 w-full max-w-lg flex justify-end pb-8">
              <button
                onClick={validateAndSubmit}
                className="bg-orange-400 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-600"
              >
                Create Club
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubCreatePage;
