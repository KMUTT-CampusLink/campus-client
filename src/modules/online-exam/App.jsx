import { Outlet } from "react-router-dom";
import Redirecting from "./middleware/Redirecting"

function App() {
  return <Outlet />;
}

export default Redirecting(App);