import { axiosInstance } from "../../../utils/axiosInstance.js";

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

const put = async (url, body) => {
  try {
    const { data } = await axiosInstance.put(url, body);
    return data;
  } catch (error) {
    return error;
  }
};

const remove = async (url) => {
  try {
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (error) {
    return error;
  }
};


export const fetchAllCourses = () => get("/courses/all");
export const fetchAllVideos = () => get("/courses/videos");
export const fetchCoursesByStudentID = (studentID) =>
  get(`/courses/student/${studentID}`);
export const fetchAllCoursesByStudentID = (studentID) =>
  get(`/courses/student/${studentID}/all`);
export const fetchAllCoursesByProfessorID = (professorID) =>
  get(`/courses/${professorID}/teach`);

export const fetchCourseHeaderBySectionID = (sectionID) => get(`/courses/course/${sectionID}`);
// Add a new function for student course header

export const fetchCourseHeaderBySectionIDForStudent = (sectionID) =>
  get(`/courses/student/course/${sectionID}`);


// assignment Teacher
export const fetchAllAssignmentsBySectionID = (sectionID) =>
  get(`/courses/assignment/${sectionID}/all`);
export const createAssignment = (newAssignment) =>
  post("/courses/assignment/create", newAssignment);
export const editAssignment = (assignmentID, updatedAssignment) =>
  put(`/courses/assignment/${assignmentID}/edit`, updatedAssignment);
export const deleteAssignment = (assignmentID) =>
  remove(`/courses/assignment/${assignmentID}/delete`);


// discussion Teacher
export const fetchAllDiscussionPostsBySectionID = (sectionID) =>
  get(`/courses/discussion/${sectionID}`);
export const fetchDiscussionPostBySectionID = (newTopic) =>
  post(`/courses/discussion/upload`, newTopic);
export const editDiscussionPost = (topicId, updatedPost) =>
  put(`/courses/discussion/${topicId}/edit`, updatedPost);
export const deleteDiscussionPost = (topicId) =>
  remove(`/courses/discussion/${topicId}/delete`);