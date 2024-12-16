import React, { useState, useEffect } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import RecentTransactions from "../components/RecentTransactions";
import AllTransactions from "../components/AllTransactions";
import ReceiptImage from "../asset/receipt.svg";
import "../style/typography.css";
import Money1 from "../asset/money1.png";
import Money2 from "../asset/money2.png";
import Money3 from "../asset/money3.png";
import { getInvoice } from "../services/api";

// at line 6 please comment that and line 16 uncomment that to use backend data 
// update day 15 nov : now stuff probably use real database dont comment more stuff

const InvoiceCenter = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterRecent, setFilterRecent] = useState("All");
  const [filterAll, setFilterAll] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [showMoney, setShowMoney] = useState(false);
  const [isTilting, setIsTilting] = useState(false);

  const getData = async() => {
    const response = await getInvoice();
    setTransactions(response.data);
  }
  useEffect(() => {
    getData();
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
          {/*Head UX/UI spcecial request. i hope that she someday stub her pinky toe so hard🤗🤗🤗*/}
          <div className="relative w-full lg:h-screen lg:w-1/2 flex items-center justify-center lg:pb-40 lg:mt-0 lg:mb-0 ">
            <img
              src={ReceiptImage}
              alt="Receipt"
              className={`w-50 h-80 mx-auto cursor-pointer ${
                isTilting ? "tilt" : ""
              }`}
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
                      position: "absolute",
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                ))}
              </div>
            )}
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
