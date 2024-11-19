import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/typography.css";

const RecentTransactions = ({
  transactions,
  filterRecent,
  setFilterRecent,
  setShowAll,
}) => {
  const navigate = useNavigate();

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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleArrowClick = (transaction) => {
    if (transaction.status === "Unpaid") {
      navigate(`/payment/payment-invoice/${transaction.id}`);
    }
  };

  return (
    <div className="w-full lg:w-1/2 mb-auto">
      <h2 className=" h2 py-4 lg:py-8">Recent Transactions</h2>

      <div className="flex flex-row p-0 h-min justify-between mb-4 items-center space-x-2">
        {/* Filters */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline body-1">
            Filter By: {filterRecent}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="small-label" onClick={() => setFilterRecent("All")}>
                All
              </a>
            </li>
            <li>
              <a
                className="small-label"
                onClick={() => setFilterRecent("Paid")}
              >
                Paid
              </a>
            </li>
            <li>
              <a
                className="small-label"
                onClick={() => setFilterRecent("Unpaid")}
              >
                Unpaid
              </a>
            </li>
            <li>
              <a
                className="small-label"
                onClick={() => setFilterRecent("Canceled")}
              >
                Canceled
              </a>
            </li>
            <li>
              <a
                className="small-label"
                onClick={() => setFilterRecent("Paid in Installment")}
              >
                Paid in Installment
              </a>
            </li>
          </ul>
        </div>

        {/* See All Button */}
        <button
          className="btn bg-payment-red hover:bg-red-400 text-white w-fit body-1"
          onClick={() => setShowAll(true)}
        >
          See All
        </button>
      </div>

      <div className="space-y-4 h-min">
        {recentTransactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center"
          >
            <div>
              <h3 className="big-label">{transaction.title}</h3>
              <p className="small-label text-gray-500">
                Due on {formatDate(transaction.due_date)}
              </p>
            </div>
            <div className="text-right flex flex-col items-end justify-center ml-auto mr-2">
              <p
                className={`big-label ${
                  transaction.status === "Paid"
                    ? "text-green-500"
                    : transaction.status === "Canceled"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {`${transaction.amount} BAHT`}
              </p>
              <p
                className={`bold-small ${
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

            {/* Arrow for Unpaid Transactions */}
            {transaction.status === "Unpaid" && (
              <div className="ml-2 ">
                <button
                  className="btn btn-sm btn-circle bg-payment-red hover:bg-red-500 text-white ml-2"
                  onClick={() => handleArrowClick(transaction)}
                  aria-label="Pay Now"
                >
                  ➔
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
