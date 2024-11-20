import { Link } from "react-router-dom";

const SmallNavText = ({ name, to }) => (
  <div className="mt-2 text-center">
    <Link
      to={to}
      className="text-sm text-gray-500 underline underline-offset-1 hover:text-gray-800"
    >
      {name}
    </Link>
  </div>
);

export default SmallNavText;
