import { useQuery } from "@tanstack/react-query";
import { fetchAllCourses, fetchCoursesByStudentID } from "./api";
export const useAllCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: fetchAllCourses,
    });
}

export const useCoursesByStudentID = (studentID) => {
    return useQuery({
        queryKey: ["courses", studentID],
        queryFn: () => fetchCoursesByStudentID(studentID),
        enabled: !!studentID,
        onError: (error) => {
            console.log(error);
        }
    });
}