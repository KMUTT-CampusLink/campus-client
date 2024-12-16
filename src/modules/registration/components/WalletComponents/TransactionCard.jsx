function TransactionCard({ transactions }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="mb-2 font-bold">Recent Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((t, i) => (
          <li key={i} className="flex flex-col text-sm">
            <div className="flex justify-between">
              <span
                className={
                  t.title === "Course Refund"
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {t.title}
              </span>
              <span className="font-medium">{t.amount} THB</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(t.issued_date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionCard;
