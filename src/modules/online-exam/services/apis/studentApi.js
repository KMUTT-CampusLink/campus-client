import { axiosInstance } from "../../../../utils/axiosInstance";

export const getStudentExamsById = async (sectionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getAllExam?&sectionId=${sectionId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getHistoryStudentExams = async (studentId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getHistoryExams?studentId=${studentId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyExamPassword = async (examId, password) => {
  try {
    const response = await axiosInstance.post("/exams/student/verifyPassword", {
      examId,
      password,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamDataById = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getExamDataById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const submitExam = async (examId, studentAnswers, studentId) => {
  try {
    const response = await axiosInstance.post("/exams/student/submitExam", {
      examId,
      studentAnswers,
      studentId,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const toggleExamStatus = async (examId, studentId) => {
  try {
    const response = await axiosInstance.put(
      "/exams/student/toggleExamStatus",
      { examId, studentId }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamTitle = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getExamTitle?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getInprogressExam = async (studentId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getInprogressExam?studentId=${studentId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getStudentAnswerById = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getStudentAnswer?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getToggleAnswer = async (examId) => {
  try {
    const response = await axiosInstance.put(
      `/exams/student/getToggleAnswer?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getStudentReview = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getStudentReview?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
