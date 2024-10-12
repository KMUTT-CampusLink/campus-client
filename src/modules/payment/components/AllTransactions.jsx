// AllTransactions.jsx
import React from 'react';

const AllTransactions = ({ transactions, filterAll, setFilterAll, isAscending, setIsAscending, setShowAll }) => {
  const filteredAllTransactions = filterAll === "All"
    ? transactions
    : transactions.filter((transaction) => transaction.status === filterAll);

  const sortedTransactions = filteredAllTransactions.sort((a, b) => {
    return isAscending
      ? new Date(a.issue_date) - new Date(b.issue_date)
      : new Date(b.issue_date) - new Date(a.issue_date);
  });

  return (
    <div className="fixed right-0 top-0 z-50 bg-white h-screen w-full max-w-full p-4 lg:max-w-md lg:p-8 overflow-y-auto transition-transform duration-500 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold">All Transactions</h2>
        {/* X button to close the modal */}
        <button className="text-gray-500 text-xl font-bold" onClick={() => setShowAll(false)}>
          &times;
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline">
            Filter By: {filterAll}
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setFilterAll("All")}>All</a></li>
            <li><a onClick={() => setFilterAll("Paid")}>Paid</a></li>
            <li><a onClick={() => setFilterAll("Unpaid")}>Unpaid</a></li>
            <li><a onClick={() => setFilterAll("Canceled")}>Canceled</a></li>
          </ul>
        </div>

        <button className="btn btn-outline mt-4 lg:mt-0" onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="space-y-4 overflow-scroll">
        {sortedTransactions.map((transaction, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{transaction.title}</h3>
              <p className="text-sm text-gray-500">Due on {transaction.dueDate}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-semibold ${transaction.status === "Paid" ? "text-green-500" : transaction.status === "Canceled" ? "text-red-500" : "text-yellow-500"}`}>
                {transaction.amount}
              </p>
              <p className={`text-sm ${transaction.status === "Paid" ? "text-green-600" : transaction.status === "Canceled" ? "text-red-600" : "text-yellow-600"}`}>
                {transaction.status.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
