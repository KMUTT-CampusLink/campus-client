import React from "react";

const StopSelector = ({ stops, stop, setStop, placeholder }) => {
  const handleSelectStartStop = (e) => {
    const selectedStop = stops.find((stop) => {
      return stop.id == e.target.value;
    });
    setStop(selectedStop); // Update the parent component's state
  };

  return (
    <div className="font-geologica">
      <select
        value={stop.id || ""}
        onChange={handleSelectStartStop}
        className="w-full py-2 pl-10 pr-4 rounded-lg outline-none border shadow-sm focus:border-orange-400"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {stops.map((stop, index) => (
          <option key={stop.id} value={stop.id}>
            {stop.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StopSelector;
// comment
