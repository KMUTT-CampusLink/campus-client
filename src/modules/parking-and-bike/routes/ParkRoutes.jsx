import MainPage from "../page/MainPage"
import Reserfailed from "../page/Reserfailed"
import CheckIn from "../page/CheckIn"
import RegisCar from "../page/RegisCar";
import Parkingslot from "../page/Parkingslot";
import ScannedCheckIn from "../page/ScannedCheckIn";
import CheckOut from "../page/CheckOut";
import ScannedCheckOut from "../page/ScannedCheckOut";
import AuthRoute from "../../registration/middleware/AuthRoute"; 
export default function ParkRoutes() {
  return [
    {
      path: "",
      element: (
        <AuthRoute>
          <MainPage />
        </AuthRoute>
      ),
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
      path:"scannedcheckin/:id",
      element:<ScannedCheckIn/>,
    },
    {
      path:"scannedcheckout/:id",
      element:<ScannedCheckOut/>,
    },
    {
      path:"checkout",
      element:<CheckOut/>
    }
  ];
}
