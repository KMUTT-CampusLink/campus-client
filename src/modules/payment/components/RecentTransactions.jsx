import React from 'react';

const RecentTransactions = ({ transactions, filterRecent, setFilterRecent, setShowAll }) => {
  const filteredRecentTransactions =
    filterRecent === "All"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.status === filterRecent
        );

  const sortedTransactions = filteredRecentTransactions.sort(
    (a, b) => new Date(b.issue_date) - new Date(a.issue_date)
  );
  const recentTransactions = sortedTransactions.slice(0, 5);

  return (
    <div className="w-1/2 mt-32 mb-auto h-[80vh] overflow-scroll">
      <h2 className="text-2xl h-max py-8 font-semibold">
        Recent Transactions
      </h2>

      <div className="flex p-0 h-min justify-between mb-4">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline">
            Filter By: {filterRecent}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => setFilterRecent("All")}>All</a>
            </li>
            <li>
              <a onClick={() => setFilterRecent("Paid")}>Paid</a>
            </li>
            <li>
              <a onClick={() => setFilterRecent("Unpaid")}>Unpaid</a>
            </li>
            <li>
              <a onClick={() => setFilterRecent("Canceled")}>Canceled</a>
            </li>
          </ul>
        </div>

        {/* See All Button */}
        <button
          className="btn btn-primary"
          onClick={() => setShowAll(true)}
        >
          See All
        </button>
      </div>

      <div className={`space-y-4 h-min overflow-scroll`}>
        {recentTransactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between "
          >
            <div>
              <h3 className="text-lg font-bold">{transaction.title}</h3>
              <p className="text-sm text-gray-500">
                Due on {transaction.dueDate}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-lg font-semibold ${
                  transaction.status === "Paid"
                    ? "text-green-500"
                    : transaction.status === "Canceled"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {transaction.amount}
              </p>
              <p
                className={`text-sm ${
                  transaction.status === "Paid"
                    ? "text-green-600"
                    : transaction.status === "Canceled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {transaction.status.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
