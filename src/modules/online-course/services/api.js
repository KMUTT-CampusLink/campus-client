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

const post = async (url, payload) => {
  try {
    const { data } = await axiosInstance.post(url, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAllCourses = () => get("/courses/all");
export const fetchAllVideos = () => get("/courses/videos");
export const fetchCoursesByStudentID = (studentID) =>
  get(`/courses/${studentID}`);
export const fetchAllCoursesByStudentID = (studentID) =>
  get(`/courses/${studentID}/all`);
export const fetchAllCoursesByProfessorID = (professorID) =>
  get(`/courses/${professorID}/teach`);
<<<<<<< HEAD
export const fetchCourseHeaderBySectionID = (sectionID) => get(`/courses/${sectionID}`);
export const fetchDiscussionPostBySectionID = (newTopic) => post(`/courses/discussion/upload`, newTopic);
=======
export const fetchCourseHeaderBySectionID = (sectionID) =>
  get(`/courses/course/${sectionID}`);
>>>>>>> 5c86225bafc317df03bc3c7aa9e8eb47f0def564
