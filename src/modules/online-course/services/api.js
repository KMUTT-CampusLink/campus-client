import { axiosInstance } from "../../../utils/axiosInstance.js";

const get = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    return error;
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
export const fetchCourseHeaderBySectionID = (sectionID) =>
  get(`/courses/course/${sectionID}`);
export const fetchCourseHeaderBySectionID = (sectionID) => get(`/courses/course/${sectionID}`);
// Add a new function for student course header
export const fetchCourseHeaderBySectionIDForStudent = (sectionID) =>
  get(`/courses/student/course/${sectionID}`);
