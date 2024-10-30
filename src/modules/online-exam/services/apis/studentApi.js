import axios from "axios";

export const getStudentExams = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/exams/student/getAllExam");
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getHistoryStudentExams = async () => {

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