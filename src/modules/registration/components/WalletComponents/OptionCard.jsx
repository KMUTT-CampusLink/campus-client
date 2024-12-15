function OptionCard() {
  const options = [
    { label: "Top Up", icon: "💰" },
    { label: "Withdraw", icon: "🏧" },
  ];

  return (
    <div className="flex justify-around p-4 bg-white rounded-lg shadow-md">
      {options.map((option, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl">{option.icon}</div>
          <p>{option.label}</p>
        </div>
      ))}
    </div>
  );
}

export default OptionCard;
