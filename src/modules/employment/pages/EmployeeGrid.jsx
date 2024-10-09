// EmployeeGrid.jsx
import React, { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';

const EmployeeGrid = () => {
  const [employees, setEmployees] = useState([]);

  // Dummy data,replace with API call
  useEffect(() => {
    setEmployees([
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
    ]);
  }, []);

  return (
    <div className="max-w-6xl sm:mx-[10%] mx-[2%] flex justify-center">
        <div className="flex flex-wrap gap-4 sm:gap-7">
            {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
            ))}
         </div>
    </div>
      
  );
};

export default EmployeeGrid;
