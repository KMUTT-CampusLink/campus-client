import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const FormInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  showToggle,
  toggleVisibility,
}) => (
  <div className="mb-2">
    <label className="block text-sm font-medium mb-1">{name}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
        required
      />
      {showToggle && (
        <span
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-3 flex justify-center items-center text-gray-500 cursor-pointer"
        >
          {type === "password" ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </span>
      )}
    </div>
  </div>
);

export default FormInput;
