import PropTypes from "prop-types";

const Alert = ({ severity, message, onClose }) => {
  let severityClasses;
  switch (severity) {
    case "success":
      severityClasses = "bg-green-100 text-green-800";
      break;
    case "error":
      severityClasses = "bg-red-100 text-red-800";
      break;
    case "info":
      severityClasses = "bg-blue-100 text-blue-800";
      break;
    case "warning":
      severityClasses = "bg-yellow-100 text-yellow-800";
      break;
    default:
      severityClasses = "";
  }

  return (
    <div
      className={`z-[9999] fixed bottom-4 right-4 p-4 mb-4 border-l-4 text-sm ${severityClasses} border-current rounded transition-opacity duration-500 ease-in-out ${
        message ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

// Prop validation using PropTypes
Alert.propTypes = {
  severity: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
