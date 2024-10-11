import React, { useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import billFolder from "../asset/billfolder2.png"; // Import the image

const InvoiceCenter = () => {
  const [filterRecent, setFilterRecent] = useState("All");
  const [filterAll, setFilterAll] = useState("All");
  const [showAll, setShowAll] = useState(false); // Track "See All" state
  const [isAscending, setIsAscending] = useState(true); // Sorting state

  // Mock Transactions Data
  const transactions = [
    {
      title: "Laptop",
      issue_date: "2023-05-24",
      dueDate: "24/05/2023",
      amount: "230 BAHT",
      status: "Unpaid",
    },
    {
      title: "Tuition fees",
      issue_date: "2023-04-24",
      dueDate: "24/05/2023",
      amount: "230 BAHT",
      status: "Paid",
    },
    {
      title: "Backpack",
      issue_date: "2023-04-24",
      dueDate: "24/05/2023",
      amount: "230 BAHT",
      status: "Canceled",
    },
    {
      title: "Phone bill",
      issue_date: "2023-06-15",
      dueDate: "15/06/2023",
      amount: "120 BAHT",
      status: "Unpaid",
    },
    {
      title: "Travel Insurance",
      issue_date: "2024-02-05",
      dueDate: "05/02/2024",
      amount: "900 BAHT",
      status: "Unpaid",
    },
    {
      title: "Subscription Service",
      issue_date: "2023-01-15",
      dueDate: "15/02/2023",
      amount: "150 BAHT",
      status: "Paid",
    },
    {
      title: "Gym Membership",
      issue_date: "2023-07-10",
      dueDate: "10/07/2023",
      amount: "500 BAHT",
      status: "Canceled",
    },
    {
      title: "Medical Bill",
      issue_date: "2023-09-12",
      dueDate: "12/09/2023",
      amount: "1,000 BAHT",
      status: "Unpaid",
    },
    {
      title: "Flight Ticket",
      issue_date: "2023-10-20",
      dueDate: "20/10/2023",
      amount: "3,000 BAHT",
      status: "Paid",
    },
    {
      title: "Gadget Purchase",
      issue_date: "2023-11-05",
      dueDate: "05/11/2023",
      amount: "5,000 BAHT",
      status: "Canceled",
    },
  ];

  // Filter for All List
  const filteredAllTransactions =
    filterAll === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filterAll);
  //Filet for Recent List
  const filteredRecentTransactions =
    filterRecent === "All"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.status === filterRecent
        );

  //Recent slicing
  const sortedTransactions = filteredRecentTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentTransactions = sortedTransactions.slice(0, 5);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-7xl pt-20 w-4/5 relative">
        <div className="flex h-[80vh]">
          {/* Left-Side Image */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="sticky top-20">
              {" "}
              {/* Sticky Image */}
              <img
                src={billFolder}
                alt="Bill Folder Image"
                className="max-w-full h-auto rounded-lg"
                style={{ width: "500px", height: "500px" }} // Fixed size
              />
            </div>
          </div>

          {/* Right-Side Transactions */}
          <div className="w-1/2 mt-32 mb-auto h-[80vh] overflow-scroll ">
            <h2 className="text-2xl h-max py-8 font-semibold">
              Recent Transactions
            </h2>

            {/* Filter Dropdown */}
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
              {!showAll && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAll(true)}
                >
                  See All
                </button>
              )}
            </div>

            {/* Transactions List */}
            <div
              className={`space-y-4 h-min overflow-scroll  `}
            >
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

          {/* Full List - See All */}
          {showAll && (
            <div
              className={`fixed right-0 top-0 z-50 bg-white h-screen max-w-md w-full p-8 overflow-y-auto transition-transform duration-500 ease-in-out ${
                showAll ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-6">All Transactions</h2>

              {/* Filter Dropdown in All Transactions */}
              <div className="flex justify-between items-center mb-4">
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-outline">
                    Filter By: {filterAll}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => setFilterAll("All")}>All</a>
                    </li>
                    <li>
                      <a onClick={() => setFilterAll("Paid")}>Paid</a>
                    </li>
                    <li>
                      <a onClick={() => setFilterAll("Unpaid")}>Unpaid</a>
                    </li>
                    <li>
                      <a onClick={() => setFilterAll("Canceled")}>Canceled</a>
                    </li>
                  </ul>
                </div>

                {/* Sorting Button */}
                <button
                  className="btn btn-outline"
                  onClick={() => setIsAscending(!isAscending)}
                >
                  {isAscending ? "Ascending" : "Descending"}
                </button>
              </div>

              {/* Full Transaction List */}
              <div
                className={`space-y-4 overflow-scroll transition-transform duration-500 ease-in-out ${
                  showAll ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {filteredAllTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
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
          )}

          {/* Overlay when "See All" is clicked */}
          {showAll && (
            <div
              className="fixed inset-0 z-40 bg-black opacity-60"
              onClick={() => setShowAll(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default InvoiceCenter;
