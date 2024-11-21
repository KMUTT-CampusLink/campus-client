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
      element:(<AuthRoute>
        <MainPage />
      </AuthRoute>
      )
          ,
    },
    {
      path:"parkingslot/",
      element:(<AuthRoute>
        <Parkingslot />
      </AuthRoute>
      ),
    },
    {
      path:"checkin/",
      element:
      (<AuthRoute>
        <CheckIn />
      </AuthRoute>
      ),
    },
    {
      path:"regis/",
      element:
      (<AuthRoute>
        <RegisCar />
      </AuthRoute>
      ),
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
