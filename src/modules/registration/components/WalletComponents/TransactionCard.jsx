function TransactionCard() {
    const transactions = [
      { type: "Withdrawal", amount: "50 THB", date: "27 Feb 2024" },
      { type: "Deposit", amount: "200 THB", date: "26 Feb 2024" },
      { type: "Withdrawal", amount: "75 THB", date: "25 Feb 2024" },
      { type: "Deposit", amount: "150 THB", date: "24 Feb 2024" },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2">Recent Transactions</h3>
        <ul className="space-y-2">
          {transactions.map((t, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{t.type}</span>
              <span>{t.amount}</span>
              <span className="text-gray-500">{t.date}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TransactionCard;
  