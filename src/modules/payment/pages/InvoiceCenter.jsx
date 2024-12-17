import React, { useState, useEffect } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import RecentTransactions from "../components/RecentTransactions";
import AllTransactions from "../components/AllTransactions";
import ReceiptImage from "../asset/receipt.svg";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import "../style/typography.css";
import { getInvoice } from "../services/api";

const InvoiceCenter = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterRecent, setFilterRecent] = useState("All");
  const [filterAll, setFilterAll] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const getData = async () => {
    const response = await getInvoice();
    setTransactions(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-full lg:max-w-7xl pt-10 lg:pt-20 w-full px-4 lg:px-0">
        <div className="flex flex-col-reverse lg:flex-row h-auto">
          {/* My Wallet Button and Image */}
          <div className="w-full lg:w-1/2 order-2 lg:order-none flex flex-col items-center justify-center lg:pb-40 lg:mt-0 lg:mb-0 lg:pt-40">
            <img
              src={ReceiptImage}
              alt="Receipt"
              className={`w-50 h-80 mx-auto lg:mb-0 lg:order-first`}
            />
            <Link to="/regis/wallet" className="w-full px-4 lg:px-6 lg:mt-4">
              <button className={`bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center shadow-md w-full lg:w-full`}>
                <div className="text-3xl text-white mr-2">
                  <GiWallet />
                </div>
                <p className="text-sm lg:text-base">My Wallet</p>
              </button>
            </Link>
          </div>

          {/* Recent Transactions */}
          <div className="w-full lg:w-1/2 order-1 lg:order-none mb-4 lg:mb-0">
            <RecentTransactions
              transactions={transactions}
              filterRecent={filterRecent}
              setFilterRecent={setFilterRecent}
              setShowAll={setShowAll}
              className="lg:mb-6"
            />
          </div>

          {showAll && (
            <>
              <AllTransactions
                transactions={transactions}
                filterAll={filterAll}
                setFilterAll={setFilterAll}
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
