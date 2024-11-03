import React, { useState, useEffect } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import RecentTransactions from "../components/RecentTransactions";
import AllTransactions from "../components/AllTransactions";
import ReceiptImage from "../asset/receipt.svg";
import { transactions } from "../components/Transaction";
import "../style/typography.css";
import Money1 from "../asset/money1.png";
import Money2 from "../asset/money2.png";
import Money3 from "../asset/money3.png";

// at line 6 please comment that and line 11 uncomment that to use backend data
const InvoiceCenter = () => {
  //const [transactions, setTransactions] = useState([]);
  const [filterRecent, setFilterRecent] = useState("All");
  const [filterAll, setFilterAll] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [showMoney, setShowMoney] = useState(false);
  const [isTilting, setIsTilting] = useState(false);

  useEffect(() => {
    // Fetch transactions from the API
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment/invoice"
        );
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

  const handleImageClick = () => {
    setShowMoney(true);
    setIsTilting(true);
    setTimeout(() => {
      setShowMoney(false);
      setIsTilting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-full lg:max-w-7xl pt-10 lg:pt-20 w-full px-4 lg:px-0 ">
        <div className="flex flex-col lg:flex-row h-auto ">
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0 lg:mb-0 ">
            <div className="relative">
              <img
                src={ReceiptImage}
                alt="Receipt"
                className={`w-50 h-80 mx-auto hover:rotate-6 cursor-pointer ${isTilting ? "tilt" : ""}`}
                onClick={handleImageClick}
              />
              {showMoney && (
                <div className="absolute inset-0 flex flex-wrap justify-center items-start">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <img
                      key={index}
                      src={[Money1, Money2, Money3][index % 3]}
                      alt="Money"
                      className="w-20 h-20 animate-money-bill"
                      style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        transform: `rotate(${Math.random() * 360}deg)`
                      }}
                    />
                  ))}
                </div>
              )}
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

