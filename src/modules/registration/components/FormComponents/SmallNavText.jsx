import { Link } from "react-router-dom";

const SmallNavText = ({ name, to }) => (
  <div className="text-center mt-2">
    <Link
      to={to}
      className="text-sm underline underline-offset-1 text-gray-500 hover:text-gray-800"
    >
      {name}
    </Link>
  </div>
);

export default SmallNavText;