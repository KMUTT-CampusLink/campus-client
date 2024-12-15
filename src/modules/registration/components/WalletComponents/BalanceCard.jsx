function BalanceCard() {
  return (
    <div className="flex items-center justify-center">
      <div className="p-4 bg-white-600 rounded-full shadow-md flex flex-col items-center justify-center w-48 h-48 border-8 border-orange-600">
        <h3 className="text-lg text-gray-600 font-semibold">Balance</h3>
        <p className="text-2xl font-bold">100.00 THB</p>
      </div>
    </div>
  );
}

export default BalanceCard;
