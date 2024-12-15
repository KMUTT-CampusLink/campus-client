import { axiosInstance } from "../../../../utils/axiosInstance";

export const getStudentExamsById = async (sectionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getAllExam?sectionid=${sectionId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getHistoryStudentExams = async (sectionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getHistoryExams?sectionid=${sectionId}`
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

export const getInprogressExam = async (sectionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getInprogressExam?sectionid=${sectionId}`
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

export const toggleAnswer = async (examId) => {
  try {
    const response = await axiosInstance.put(
      `/exams/student/toggleAnswer?examId=${examId}`
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

export const getStudentStatus = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getStudentStatus?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getRemainingTime = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getExamTime?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getFullMark = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getFullMark?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const studentGetStudentScoreById = async (questionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getScoreById?questionId=${questionId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const studentGetQuestionScore = async (questionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/getstudentQuestionScore?questionId=${questionId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
export const studentGetStudentAnswerById = async (examId, questionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/studentGetStudentAnswerById?examId=${examId}&questionId=${questionId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getStudentExamReview = async (examId, studentExamId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/student/studentExamReview?examId=${examId}&studentExamId=${studentExamId}`
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};