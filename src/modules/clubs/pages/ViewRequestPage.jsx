//AdminViewRequestPage
import React from 'react';

const ViewRequest = () => {
  const requests = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Smith' },
    { id: 3, name: 'Linc' },
    { id: 4, name: 'Salah' },
  ];

  const handleAccept = (id) => {
    console.log(`Accepted member with ID: ${id}`);
    // Call API to accept the member
  };

  const handleDecline = (id) => {
    console.log(`Declined member with ID: ${id}`);
    // Call API to decline the member
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">View Requests</h1> */}
      <ul className="space-y-4">
        {requests.map((request) => (
          <li key={request.id} className="flex justify-between items-center border p-4 rounded-md">
            <div className="font-medium">{request.name}</div>
            <div className="space-x-2">
              <button 
                onClick={() => handleAccept(request.id)} 
                className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-all duration-200"
              >
                Accept
              </button>
              <button 
                onClick={() => handleDecline(request.id)} 
                className="bg-yellow-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRequest;
