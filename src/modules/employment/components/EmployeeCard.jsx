import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/employ/employeeDetail/${employee.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer border-[#8D493A] border-[0.1px] p-2   md:p-4 rounded-[15px] shadow-lg hover:shadow-xl transition flex flex-col  md:w-[160px] w-[140px] bg-[#F2F2F2]">
      <div className="w-90 mt-3 border-[#8D493A] border-[0.1px] rounded-lg">
        <img src={employee.image || 'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?cs=srgb&dl=pexels-bertellifotografia-3792581.jpg&fm=jpg'} alt={employee.id} className="object-cover rounded-lg shadow-lg md:w-[230px] md:h-[140px] w-[180px] h-[130px] " />
      </div>
      <div className=" mt-3 ">
        <h1 className="text-left font-geologica font-bold text-[17px] md:text-[20px]">{employee.firstname} {employee.midname} {employee.lastname}</h1>
        <p className="font-geologica text-[10px] md:text-[12px] text-left">{employee.id}</p>
        <p className="font-geologica text-[10px] md:text-[12px] text-left">{employee.faculty?.name || 'Faculty not available'}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
