import React, { useState } from 'react';
import NavBar from '../../registration/components/NavBarComponents/NavBar';

const transactions = [
  { title: 'Laptop', dueDate: '24/05/2023', amount: '230 BAHT', status: 'Unpaid' },
  { title: 'Tuition fees', dueDate: '24/05/2023', amount: '230 BAHT', status: 'Paid' },
  { title: 'Backpack', dueDate: '24/05/2023', amount: '230 BAHT', status: 'Overdue' }
];

const InvoiceCenter = () => {
  const [filter, setFilter] = useState('All');

  // Filter transactions based on status (Paid, Unpaid, Overdue, etc.)
  const filteredTransactions = filter === 'All' ? transactions : transactions.filter(transaction => transaction.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Card Display (Optional based on UX/UI) */}
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/300x150" // Placeholder for the VISA card image
            alt="Card Image"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Recent Transactions Title */}
        <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>

        {/* Filter Dropdown */}
        <div className="flex justify-between items-center mb-4">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline">
              Filter By: {filter}
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => setFilter('All')}>All</a></li>
              <li><a onClick={() => setFilter('Paid')}>Paid</a></li>
              <li><a onClick={() => setFilter('Unpaid')}>Unpaid</a></li>
              <li><a onClick={() => setFilter('Overdue')}>Overdue</a></li>
            </ul>
          </div>

          <button className="btn btn-sm">See All</button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{transaction.title}</h3>
                <p className="text-sm text-gray-500">Due on {transaction.dueDate}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${transaction.status === 'Paid' ? 'text-green-500' : transaction.status === 'Overdue' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {transaction.amount}
                </p>
                <p className={`text-sm ${transaction.status === 'Paid' ? 'text-green-600' : transaction.status === 'Overdue' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {transaction.status.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceCenter;
