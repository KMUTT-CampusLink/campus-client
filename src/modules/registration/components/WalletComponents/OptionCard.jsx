function OptionCard() {
    const options = [
      { label: "Deposit", icon: "💰" },
      { label: "Transfer", icon: "🔄" },
      { label: "Withdraw", icon: "🏧" },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-around">
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
  