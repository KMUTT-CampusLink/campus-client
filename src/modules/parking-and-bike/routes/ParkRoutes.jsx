import MainPage from "../page/MainPage"
import Reserfailed from "../page/Reserfailed"
import CheckIn from "../page/CheckIn"
import RegisCar from "../page/RegisCar";
import Parkingslot from "../page/Parkingslot";
import Scanned from "../page/ScannedCheckIn";
import CheckOut from "../page/CheckOut";

export default function ParkRoutes() {
  return [
    {
      path:"",
      element:<MainPage/>,
    },
    {
      path:"parkingslot/",
      element:<Parkingslot/>,
    },
    {
      path:"checkin/",
      element:<CheckIn/>
    },
    {
      path:"regis/",
      element:<RegisCar/>
    },
    {
      path:"failed/",
      element:<Reserfailed/>,
    },
    {
      path:"scanned/:id",
      element:<Scanned/>,
    },
    {
      path:"checkout",
      element:<CheckOut/>
    }
  ];
}
