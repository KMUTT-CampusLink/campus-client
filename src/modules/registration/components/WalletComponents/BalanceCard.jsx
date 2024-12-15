function BalanceCard({ balance }) {
  const formatBalance = (balance) => {
    const num = parseFloat(balance);
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    } else {
      return num.toFixed(2);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="p-4 bg-white-600 rounded-full shadow-md flex flex-col items-center justify-center w-48 h-48 border-8 border-orange-600">
        <h3 className="text-lg text-gray-600 font-semibold">Balance</h3>
        <p className="text-2xl font-bold">{formatBalance(balance)} THB</p>
      </div>
    </div>
  );
}

export default BalanceCard;
