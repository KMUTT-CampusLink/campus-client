import Campus from "../pages/Campus";
import ContactPage from "../pages/ContactPage";
import Map from "../pages/Map";
import SubmissionsPage from "../pages/SubmissionsPage";

const Test = () => {
  return <h1>Map</h1>;
};

export default function MapRoutes() {
  return [
    {
      path: "",
      element: <Map />
    },
    {
      path: ":campusName", 
      element: <Campus />,
    },
    {
      path: "contact",
      element: <ContactPage/>
    },
    {
      path: "submissions",
      element: <SubmissionsPage/>
    }
  ];
}