import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
});

export const fetchAuth = async () => {
  return axiosInstance.get('/authorize').then((res) => res.data);
};

export const activateAccount = async (activationData) => {
    return axiosInstance.post('/users/activate', activationData).then((res) => res.data);
  };

export const logIn = async (credentials) => {
  return axiosInstance.post('/users/login', credentials).then((res) => res.data);
};

export const fetchStudentById = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`/regis/student/${userId}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching student data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchCourseBySearchTerm = async (searchTerm) => {
  if (!searchTerm.trim()) {
    throw new Error("Search term cannot be empty."); //Early return if the term is empty
  }
  try {
    const { data } = await axiosInstance.get(
      `/regis/course/search?query=${searchTerm}`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching courses:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchSectionByCourseCode = async (courseCode) => {
  try {
    const { data } = await axiosInstance.get(
      `/regis/course/${courseCode}/section`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching sections:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchSemestersByStudentId = async (studentId) => {
  try {
    const { data } = await axiosInstance.get(
      `/regis/enroll/semesters/${studentId}`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching semesters:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchTranscriptBySemesterId = async (studentId, semesterId) => {
  try {
    const { data } = await axiosInstance.get(
      `${
        import.meta.env.VITE_API_URL
      }/regis/transcript/${studentId}/${semesterId}`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching transcripts:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchTranscriptByStudentId = async (studentId) => {
  try {
    const { data } = await axiosInstance.get(`/regis/transcript/${studentId}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching transcripts:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchGPAXBySemesterId = async (studentId, semesterId) => {
  try {
    const { data } = await axiosInstance.get(
      `regis/gpax/${studentId}/${semesterId}`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching GPAX:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchGPAXByStudentId = async (studentId) => {
  try {
    const { data } = await axiosInstance.get(`/regis/gpax/${studentId}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching GPAX:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchActiveCoursesByStudentId = async (studentId) => {
  try {
    const { data } = await axiosInstance.get(
      `/regis/course/${studentId}/active`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching Courses:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const addEnrollmentDetail = async (newEnrollment) => {
  return axiosInstance.post("/regis/enroll", newEnrollment);
};

export const deleteEnrollmentDetail = async (enrollment) => {
  return axiosInstance.delete(`/regis/enroll/${enrollment.enrollmentDetailId}`);
};