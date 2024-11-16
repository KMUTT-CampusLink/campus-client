import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import NavBarProfessor from "../../components/professor/NavBarProfessor";
import { useGetSetting } from "../../services/queries";
import { useParams } from "react-router-dom";
import LoadingPage from "../../../dev/pages/LoadingPage";
import { Outlet } from "react-router-dom";

const ProfessorDashBoard = () => {
  const { section_id } = useParams();
  const { data, isLoading, error } = useGetSetting(section_id);
  if (error) console.error(error.message);
  if (isLoading) return <LoadingPage message="fetching" />;

  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="w-full h-fit flex items-center justify-center pt-[4rem] min-[990px]:pt-[5rem]">
        {/* Container */}
        <div className="w-full flex-col items-center justify-center">
          <NavBarProfessor />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashBoard;
