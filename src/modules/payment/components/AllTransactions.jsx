import React from "react";
import { getTransactionDetails } from "../services/api";
import "../style/typography.css";

const AllTransactions = ({
  transactions,
  filterAll,
  setFilterAll,
  isAscending,
  setIsAscending,
  setShowAll,
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="fixed right-0 top-0 z-50 bg-white h-screen w-full max-w-full p-4 lg:max-w-md lg:p-8 overflow-y-auto transition-transform duration-500 ease-in-out">
        <div className="flex flex-row justify-between items-center mb-6 pt-14">
          <h2 className="h3">All Transactions</h2>
          {/* X button to close the modal */}
          <button onClick={() => setShowAll(false)} aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-center body-1 text-gray-500">No Invoice Found</p>
      </div>
    );
  }

  const filteredAllTransactions =
    filterAll === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filterAll);

  const sortedTransactions = filteredAllTransactions.sort((a, b) => {
    return isAscending
      ? new Date(a.issue_date) - new Date(b.issue_date)
      : new Date(b.issue_date) - new Date(a.issue_date);
  });

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleArrowClick = async (transaction) => {
    const response = await getTransactionDetails(transaction.id);
    if (response && response.data) {
      window.location.href = `/payment/payment-invoice/${transaction.id}`;
    } else {
      console.error("Failed to fetch transaction details");
    }
  };

  return (
    <div className="fixed right-0 top-0 z-50 bg-white h-screen w-full max-w-full p-4 lg:max-w-md lg:p-8 overflow-y-auto transition-transform duration-500 ease-in-out">
      <div className="flex flex-row justify-between items-center mb-6 pt-14">
        <h2 className="h3">All Transactions</h2>
        {/* X button to close the modal */}
        <button onClick={() => setShowAll(false)} aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-row justify-between items-center mb-4 space-x-2">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline body-1">
            Filter By: {filterAll}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="small-label" onClick={() => setFilterAll("All")}>
                All
              </a>
            </li>
            <li>
              <a className="small-label" onClick={() => setFilterAll("Paid")}>
                Paid
              </a>
            </li>
            <li>
              <a className="small-label" onClick={() => setFilterAll("Unpaid")}>
                Unpaid
              </a>
            </li>
            <li>
              <a
                className="small-label"
                onClick={() => setFilterAll("Cancelled")}
              >
                Cancelled
              </a>
            </li>
            <li>
              <a
                className="small-label"
                onClick={() => setFilterAll("Pay_by_Installments")}
              >
                Pay by Installments
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4 ">
        {sortedTransactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="big-label">{transaction.title}</h3>
              <p className="text-sm text-gray-500">
                Due on {formatDate(transaction.due_date)}
              </p>
            </div>
            <div className="text-right flex flex-col items-end justify-center ml-auto mr-2">
              <p
                className={`big-label ${
                  transaction.status === "Paid"
                    ? "text-green-500"
                    : transaction.status === "Cancelled"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumberWithCommas(transaction.amount)} BAHT
              </p>
              <p
                className={`bold-small ${
                  transaction.status === "Paid"
                    ? "text-green-600"
                    : transaction.status === "Cancelled"
                    ? "text-red-600"
                    : transaction.status === "Pay_by_Installments"
                    ? "text-yellow-600"
                    : transaction.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {transaction.status === "Pay_by_Installments"
                  ? "Pay by Installments"
                  : transaction.status.toUpperCase()}
              </p>
            </div>

            {/* Add Arrow for Unpaid or Pay by Installments Transactions */}
            {(transaction.status === "Unpaid" ||
              transaction.status === "Pay_by_Installments") && (
              <div className="ml-2">
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

export default AllTransactions;
