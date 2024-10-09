import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/employ/employee/${employee.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer border-[#8D493A] border-[0.1px] p-2   md:p-4 rounded-[15px] shadow-lg hover:shadow-xl transition flex flex-col  md:w-[160px] w-[140px] bg-[#F2F2F2]">
      <div className="w-90 mt-3 border-[#8D493A] border-[0.1px] rounded-lg">
        <img src={employee.image || 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1728345600&semt=ais_hybrid'} alt={employee.id} className="rounded-lg w-full shadow-lg " />
      </div>
      <div className=" mt-3 ">
        <h1 className="text-left font-geologica font-bold text-[17px] md:text-[20px]">{employee.name}</h1>
        <p className="font-geologica text-[10px] md:text-[12px] text-left">{employee.id}</p>
        <p className="font-geologica text-[10px] md:text-[12px] text-left">{employee.department}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
