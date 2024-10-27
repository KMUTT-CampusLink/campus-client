import React, { useState, useEffect } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import RecentTransactions from "../components/RecentTransactions";
import AllTransactions from "../components/AllTransactions";
import image from "../asset/receipt.png";
//import { transactions } from "../components/Transaction";

const InvoiceCenter = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterRecent, setFilterRecent] = useState("All");
  const [filterAll, setFilterAll] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    // Fetch transactions from the API
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/payment/invoice");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-full lg:max-w-7xl pt-10 lg:pt-20 w-full px-4 lg:px-0 ">
        <div className="flex flex-col lg:flex-row h-auto ">
          <div className="mt-16 w-full lg:w-1/2 flex items-center justify-center mb-6 lg:mb-0 ">
            <div className="top-20">
              <img
                src={image}
                alt="Credit"
                className="max-w-full h-auto rounded-lg"
                style={{ height: "300px" }}
              />
            </div>
          </div>

          <RecentTransactions
            transactions={transactions}
            filterRecent={filterRecent}
            setFilterRecent={setFilterRecent}
            setShowAll={setShowAll}
          />

          {showAll && (
            <>
              <AllTransactions
                transactions={transactions}
                filterAll={filterAll}
                setFilterAll={setFilterAll}
                isAscending={isAscending}
                setIsAscending={setIsAscending}
                setShowAll={setShowAll}
              />
              <div
                className="fixed inset-0 z-40 bg-black opacity-60"
                onClick={() => setShowAll(false)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvoiceCenter;
