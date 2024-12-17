import AuthRoute from "../../registration/middleware/AuthRoute";
import MainPage from "../page/MainPage"
import RegisCar from "../page/RegisCar";
import ParkingSpot from "../page/ParkingSpot";
import Process from "../page/Process";
import Checking from "../page/Checking";
import History from "../page/History";
import ScanIn from "../page/ScanIn";
import ScanOut from "../page/ScanOut";

export default function ParkRoutes() {
  return [
    {
      path: "",
      element: (
          <MainPage />
      ),
    },
    {
      path:"regis",
      element:<RegisCar/>
    },
    {
      path:"parkingspot",
      element:<ParkingSpot/>
    },
    {
      path:"process",
      element:<Process/>
    },
    {
      path:"checking",
      element:<Checking/>
    },
    {
      path:"history",
      element:<History/>
    },
    {
      path:"scanin/:id",
      element:<ScanIn/>
    },
    {
      path:"scanout/:id",
      element:<ScanOut/>
    },
  ];
}
