import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/employ/studentDetail/${student.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer border-[#8D493A] border-[0.1px] p-2   md:p-4 rounded-[15px] shadow-lg hover:shadow-xl transition flex flex-col  md:w-[180px] w-[150px] h-[230px] md:h-[280px] bg-[#F2F2F2] overflow-hidden ">
      <div className="w-90 mt-3 border-[#8D493A] border-[0.1px] rounded-lg">
        <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt={student.id} className="object-cover rounded-lg shadow-lg md:w-[230px] md:h-[140px] w-[180px] h-[130px] " />
      </div>
      <div className=" mt-3 ">
        <h1 className="text-left font-geologica font-bold text-[16px] md:text-[20px]">{student.firstname} {student.midname} {student.lastname}</h1>
        <p className="font-geologica text-[9px] md:text-[12px] text-left">{student.id}</p>
        <p className="font-geologica text-[9px] md:text-[12px] text-left">{student.degree.name}</p>
      </div>
    </div>
  );
};

export default StudentCard;