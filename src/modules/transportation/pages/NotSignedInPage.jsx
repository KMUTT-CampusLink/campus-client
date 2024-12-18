import { div } from "@tensorflow/tfjs-core";
import NavBar from "../../registration/components/NavBarComponents/NavBar";

function NotSignedInPage() {
  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <p>not signed in as a student or driver to use transportation service</p>
    </div>
  );
}

export default NotSignedInPage;
