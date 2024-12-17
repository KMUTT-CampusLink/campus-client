import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useFace from "../hook/useFace";

const FaceComponent = () => {
  const { items, handleMenuClick, detail, faceButton } = useFace();

  return (
    <div className="px-0">
      <hr className="border-gray-300 w-full m-0" />
      <div className="p-4 md:p-8 pl-4 pr-4 md:pl-24 md:pr-24">
        <div className="mt-2">{faceButton && faceButton()}</div>
      </div>
    </div>
  );
};

export default FaceComponent;
