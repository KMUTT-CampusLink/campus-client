import axios from "axios";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
});

// Centralized error handling
const handleApiError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  console.error("API Error:", errorMessage);
  throw new Error(errorMessage);
};

// Generic GET request
const get = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Generic POST request
const post = async (url, payload) => {
  try {
    const { data } = await axiosInstance.post(url, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// API calls
export const fetchAuth = () => get("/authorize");
export const activateAccount = (activationData) =>
  post("/users/activate", activationData);
export const logIn = (credentials) => post("/users/login", credentials);

export const fetchStudentById = (studentId) => get(`/regis/student/${studentId}`);
export const fetchCourseBySearchTerm = async (searchTerm) => {
  if (!searchTerm.trim()) throw new Error("Search term cannot be empty.");
  return get(`/regis/course/search?query=${searchTerm}`);
};
export const fetchSectionByCourseCode = (courseCode) =>
  get(`/regis/course/${courseCode}/section`);
export const fetchSemestersByStudentId = (studentId) =>
  get(`/regis/enroll/semesters/${studentId}`);
export const fetchTranscriptBySemesterId = (studentId, semesterId) =>
  get(`/regis/transcript/${studentId}/${semesterId}`);
export const fetchTranscriptByStudentId = (studentId) =>
  get(`/regis/transcript/${studentId}`);
export const fetchGPAXBySemesterId = (studentId, semesterId) =>
  get(`/regis/gpax/${studentId}/${semesterId}`);
export const fetchGPAXByStudentId = (studentId) =>
  get(`/regis/gpax/${studentId}`);
export const fetchActiveCoursesByStudentId = (studentId) =>
  get(`/regis/course/${studentId}/active`);

export const fetchEnrollmentHead = (enrollment) =>
  post("/regis/enroll/head", enrollment);
export const addEnrollmentDetail = (newEnrollment) =>
  post("/regis/enroll", newEnrollment);
export const deleteEnrollmentDetail = (enrollment) => {
  return axiosInstance.delete(`/regis/enroll/${enrollment.enrollmentDetailId}`);
};
export const fetchPaymentStatus = (headId) =>
  get(`/regis/enroll/payment/${headId}`);
