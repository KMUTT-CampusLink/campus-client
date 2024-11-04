
import MainPage from "../page/MainPage"
import Reserfailed from "../page/Reserfailed"
import Receipt from "../page/Receipt"
import Help from "../page/Help";
import Parkingslot from "../page/Parkingslot";

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
      path:"receipt/",
      element:<Receipt/>
    },
    {
      path:"help/",
      element:<Help/>
    },
    {
      path:"failed/",
      element:<Reserfailed/>,
    },
  ];
}
