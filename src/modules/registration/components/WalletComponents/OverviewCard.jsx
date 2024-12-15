function OverviewCard({ refunds, deposits, others }) {
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
    <div className="grid grid-cols-3 bg-white p-4 rounded-lg shadow-md">
      <div>
        <div className="pl-2 border-l-4 border-orange-600">
          <p className="text-md font-bold">Deposits</p>
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm font-semibold">
            {formatBalance(deposits)} THB
          </span>
        </div>
      </div>
      <div>
        <div className="pl-2 border-l-4 border-orange-600">
          <p className="text-md font-bold">Refunds</p>
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm font-semibold">
            {formatBalance(refunds)} THB
          </span>
        </div>
      </div>
      <div>
        <div className="pl-2 border-l-4 border-orange-600">
          <p className="text-md font-bold">Others</p>
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm font-semibold">
            {formatBalance(others)} THB
          </span>
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;
