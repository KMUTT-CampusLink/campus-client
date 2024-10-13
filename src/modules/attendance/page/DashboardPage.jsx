import DashboardComponent from "../components/DashboardComponent";
import useDashboard from "../hook/useDashboard";
import NavBar from '../../registration/components/NavBarComponents/NavBar';

const DashboardPage = () => {
  const dashboard = useDashboard();
  return (
    <>
       
        <NavBar />
        <DashboardComponent {...dashboard} />
    </>
);
};
export default DashboardPage;
