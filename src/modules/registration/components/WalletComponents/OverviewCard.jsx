function OverviewCard() {
  return (
    <div className="grid grid-cols-3 bg-white p-4 rounded-lg shadow-md">
      <div>
        <div className="pl-2 border-l-4 border-orange-600">
          <p className="text-md font-bold">Deposits</p>
        </div>
        <div className="pl-2 mt-2">
          <div className="text-gray-600 text-sm">Balance</div>
          <div className="text-sm font-semibold">300 B</div>
        </div>
      </div>
      <div>
        <div className="pl-2 border-l-4 border-orange-600">
          <p className="text-md font-bold">Refunds</p>
        </div>
        <div className="pl-2 mt-2">
          <div className="text-gray-600 text-sm">Balance</div>
          <div className="text-sm font-semibold">300 B</div>
        </div>
      </div>
      <div>
        <div className="pl-2 border-l-4 border-orange-600">
          <p className="text-md font-bold">Others</p>
        </div>
        <div className="pl-2 mt-2">
          <div className="text-gray-600 text-sm">Balance</div>
          <div className="text-sm font-semibold">300 B</div>
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;
