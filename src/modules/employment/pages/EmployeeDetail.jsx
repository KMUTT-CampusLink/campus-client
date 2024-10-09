
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  // Dummy data fetch - replace with actual API call
  useEffect(() => {
    const fetchEmployee = async () => {
      const data = [
        { id: '66130500811', name: 'Koe Koe', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500812', name: 'kiaer', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500813', name: 'bfejwi', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500814', name: 'csfew', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500816', name: 'dewfe', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500817', name: 'Koese', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500818', name: 'wfadf', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500819', name: 'ewfds', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500820', name: 'DEgsaef', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        { id: '66130500821', name: 'ewadfa', department: 'SIT', jobTitle: 'HR Management', position: 'Senior Consultant', address: 'No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai', contactNo: '09xxxxxxxxxx', salary: '50000$', degree: 'High School Diploma', startDate: 'Jan 2020' },
        
      ];
      const emp = data.find(emp => emp.id == id);
      setEmployee(emp);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="p-6 flex">
      <div className="w-1/4">
         <EmployeeCard employee={employee} />
      </div>
      <div className="w-3/4 pl-6">
        <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Job Title:</strong> {employee.jobTitle}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Start Date:</strong> {employee.startDate}</p>
          </div>
          <div>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Contact No.:</strong> {employee.contactNo}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            <p><strong>Degree Level:</strong> {employee.degree}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
