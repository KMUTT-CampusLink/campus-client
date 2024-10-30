import axios from "axios";

export const getStudentExamsById = async (studentId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/exams/student/getAllExam?studentId=${studentId}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getHistoryStudentExams = async (studentId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/exams/student/getHistoryExams?studentId=${studentId}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const verifyExamPassword = async (examId, password) => {
    try {
        const response = await axios.post("http://localhost:3000/api/exams/student/verifyPassword", { examId, password });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getExamDataById = async (examId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/exams/student/getExamDataById?examId=${examId}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const submitExam = async (examId, studentAnswers) => {
    try {
        const response = await axios.post("http://localhost:3000/api/exams/student/submitExam", { examId, studentAnswers });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const toggleExamStatus = async (examId, studentId) => {
    try {
        const response = await axios.put("http://localhost:3000/api/exams/student/toggleExamStatus", { examId, studentId });
        return response;
    } catch (error) {
        return error.response.data;
    }
}