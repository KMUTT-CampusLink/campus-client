
import MainPage from "../page/MainPage"
import Reserfailed from "../page/Reserfailed"
import Receipt from "../page/Receipt"


export default function ParkRoutes() {
  return [
    {
      path:"",
      element:<MainPage/>,
    },
    {
      path:"failed/",
      element:<Reserfailed/>,
    },
    {
      path:"receipt/",
      element:<Receipt/>
    }
  ];
}
