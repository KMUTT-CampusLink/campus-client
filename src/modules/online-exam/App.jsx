import { Outlet } from "react-router-dom";
import Redirecting from "./middleware/Redirecting"
import verifySection from "./middleware/verifySection";

function App() {
  return <Outlet />;
}

export default verifySection(Redirecting(App));