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
      <div className="flex flex-col items-center justify-center w-48 h-48 p-4 border-8 border-orange-600 rounded-full shadow-md bg-white-600">
        <h3 className="text-lg font-semibold text-gray-600">Balance</h3>
        <p className="text-2xl font-bold">{formatBalance(balance)} THB</p>
      </div>
    </div>
  );
}

export default BalanceCard;
