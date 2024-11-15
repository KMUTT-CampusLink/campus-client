import MainPage from "../page/MainPage"
import Reserfailed from "../page/Reserfailed"
import CheckIn from "../page/CheckIn"
import Help from "../page/Help";
import Parkingslot from "../page/Parkingslot";
import Scanned from "../page/Scanned";
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
      path:"checkout/",
      element:<CheckOut/>
    },
    {
      path:"help/",
      element:<Help/>
    },
    {
      path:"failed/",
      element:<Reserfailed/>,
    },
    {
      path:"scanned/:id",
      element:<Scanned/>,
    },
  ];
}
