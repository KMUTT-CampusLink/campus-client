import React, { useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import RecentTransactions from "../components/RecentTransactions";
import AllTransactions from "../components/AllTransactions";
import billFolder from "../asset/billfolder2.png";

const InvoiceCenter = () => {
  const [filterRecent, setFilterRecent] = useState("All");
  const [filterAll, setFilterAll] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

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

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-7xl pt-20 w-4/5 ">
        <div className="flex h-[80vh]">
          <div className="w-1/2 flex items-center justify-center">
            <div className="sticky top-20">
              <img
                src={billFolder}
                alt="Bill Folder Image"
                className="max-w-full h-auto rounded-lg"
                style={{ width: "500px", height: "500px" }}
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
