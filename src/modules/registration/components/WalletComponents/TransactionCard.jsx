function TransactionCard() {
  const transactions = [
    { type: "Withdrawal", amount: "50 THB", date: "27 Feb 2024" },
    { type: "Deposit", amount: "200 THB", date: "26 Feb 2024" },
    { type: "Withdrawal", amount: "75 THB", date: "25 Feb 2024" },
    { type: "Deposit", amount: "150 THB", date: "24 Feb 2024" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="mb-2 font-bold">Recent Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((t, i) => (
          <li key={i} className="flex flex-col text-sm">
            <div className="flex justify-between">
              <span
                className={
                  t.type === "Deposit"
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {t.type}
              </span>
              <span className="font-medium">{t.amount}</span>
            </div>

            <span className="text-sm text-gray-500">
              {t.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionCard;
