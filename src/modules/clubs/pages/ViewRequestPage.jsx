import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../utils/axiosInstance';

const ViewRequest = () => {
  const [requests, setRequests] = useState([]);
  const {clubId} = useParams();
  
  // Fetch pending requests when the component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(`/clubs/${clubId}/pending-requests`);
        setRequests(response.data.data); // Assuming response data has a data property with the list of requests
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchRequests();
  }, [clubId]);

  // Function to handle accepting a request
  const handleAccept = async (memberId) => {
    try {
      const response = await axiosInstance.put(`/clubs/${clubId}/members/${memberId}/status`, {
        status: "Accepted",
      });
      if (response.data.success) {
        console.log(`Accepted member with ID: ${memberId}`);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== memberId)
        );
      } else {
        console.error("Failed to accept request:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };
  
  // Function to handle declining a request
  const handleDecline = async (memberId) => {
    try {
      const response = await axiosInstance.put(`/clubs/${clubId}/members/${memberId}/status`, {
        status: "Rejected",
      });
      if (response.data.success) {
        console.log(`Declined member with ID: ${memberId}`);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== memberId)
        );
      } else {
        console.error("Failed to decline request:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

  const renderName = (request) => {
    if (request.student) {
      return `${request.student.firstname || ''} ${request.student.midname || ''} ${request.student.lastname || ''}`;
    }
    if (request.employee) {
      return `Prof. ${request.employee.firstname || ''} ${request.employee.midname || ''} ${request.employee.lastname || ''}`;
    }
    return "Unknown Member";
  }; 
  
  return (
    <div className="container mx-auto p-4">
      <ul className="space-y-4">
        {requests.map((request) => (
          <li key={request.id} className="flex justify-between items-center border p-4 rounded-md">
            <div className="font-medium">
              {renderName(request)}
            </div>
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