import { axiosInstance } from "../../../utils/axiosInstance.js";

const handleApiError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  console.error("API Error:", errorMessage);
  throw new Error(errorMessage);
};

const get = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

const post = async (url, body) => {
  try {
    const { data } = await axiosInstance.post(url, body);
    return data;
  } catch (error) {
    return error;
  }
};

const put = async (url, payload) => {
  try {
    const { data } = await axiosInstance.put(url, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

const remove = async (url, body) => {
  console.log("remove", url);
  console.log(body);
  try {
    const { data } = await axiosInstance.delete(url, { data: body });
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAllCourses = () => get("/courses/all");
export const fetchAllVideos = (secId) => get(`/courses/videos/${secId}`);
export const fetchCoursesByStudentID = (studentID) =>
  get(`/courses/student/${studentID}`);
export const fetchAllCoursesByStudentID = (studentID) =>
  get(`/courses/student/${studentID}/all`);
export const fetchAllCoursesByProfessorID = (professorID) =>
  get(`/courses/${professorID}/teach`);

export const fetchCourseHeaderBySectionID = (sectionID) =>
  get(`/courses/course/${sectionID}`);
// Add a new function for student course header

export const fetchCourseHeaderBySectionIDForStudent = (sectionID) =>
  get(`/courses/student/course/${sectionID}`);

// assignment Teacher

export const fetchAllAssignmentsBySectionID = (sectionID) =>
  get(`/courses/assignment/${sectionID}/all`);
//export const createAssignment = (newAssignment) =>
//post("/courses/assignment/create", newAssignment);
export const editAssignment = (assignmentID, updatedAssignment) =>
  put(`/courses/assignment/${assignmentID}/edit`, updatedAssignment);
export const deleteAssignment = (assignmentID) =>
  remove(`/courses/assignment/${assignmentID}/delete`);
export const createAssignment = (newAssignment) =>
  post("/courses/assignment/upload", newAssignment); // Update the endpoint to match the file-upload functionality

//assignment Student

export const addAssignmentSubmission = (formData) =>
  post(`/courses/assignmentSubmission`, formData);

export const editAssignmentSubmission = (assignmentID, updatedSubmission) =>
  put(`/courses/assignment/${assignmentID}/submit/edit`, updatedSubmission);

export const fetchAssignmentSubmissionFilePath = (assignmentID, studentID) =>
  get(`/courses/assignment/submission/${assignmentID}/${studentID}`);

// discussion Teacher
export const fetchAllDiscussionPostsBySectionID = (sectionID) =>
  get(`/courses/discussion/${sectionID}`);
export const fetchDiscussionPostBySectionID = (newTopic) =>
  post(`/courses/discussion/upload`, newTopic);
export const editDiscussionPost = (topicId, updatedPost) =>
  put(`/courses/discussion/${topicId}/edit`, updatedPost);
export const deleteDiscussionPost = (topicId) =>
  remove(`/courses/discussion/${topicId}/delete`);
export const fetchAllCommentsByPostID = (postId) =>
  get(`/courses/discussion/view/${postId}/comment`);
export const createDiscussionReply = (topicId, newReply) =>
  post(`/courses/discussion/${topicId}/comment/create`, newReply);

//announcement
export const fetchAllUpComingEvents = (studentID) =>
  get(`/courses/announcement/${studentID}`);

export const fetchUpComingEventsByTeacher = (empID, sectionID) =>
  get(`/courses/announcement/teacher/${empID}/${sectionID}`);

export const createUpComingEvents = (eventInfo) =>
  post(`/courses/announcement/`, eventInfo);

export const deleteUpComingEvents = (deleteInfo) => {
  return remove(`/courses/announcement/`, deleteInfo);
};

// Edit Course Material
export const editCourseMaterial = (id, formData) =>
  post(`/courses/editVideo/${id}`, formData);

// Delete Course Material
export const deleteCourseMaterial = (id) =>
  remove(`/courses/deleteVideo/${id}`);
