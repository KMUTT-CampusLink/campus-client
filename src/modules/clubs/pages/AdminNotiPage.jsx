// admin and member notifications combined 

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Helper function to get the current timestamp
const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString(); // Format the timestamp as a locale string
};

// Mock function to simulate fetching notifications from a backend
const fetchNotifications = (userType) => {
    if (userType === 'admin') {
        return [
            { 
                id: 1, 
                message: 'John Doe sent a request to join the Football Club as a new member', 
                timestamp: getCurrentTimestamp(),
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s' // Mock image URL for admin
            },
            { 
                id: 2, 
                message: 'JJ sent a request to join the Basketball Club as a new member', 
                timestamp: getCurrentTimestamp(),
                imageUrl: 'https://avatar.iran.liara.run/public/8' // Mock image URL for admin
            },
            { 
                id: 3, 
                message: 'Aze sent a request to join the Badminton Club', 
                timestamp: getCurrentTimestamp(),
                imageUrl: 'https://avatar.iran.liara.run/public/81' // Mock image URL for admin
            },
        ];
    } else {
        return [
            { 
                id: 1, 
                message: 'Your request to join Football club has been approved!', 
                timestamp: getCurrentTimestamp(),
                imageUrl: 'https://www.nbc.com/sites/nbcblog/files/styles/scale_862/public/2024/07/paris-2024-olympics-soccer.jpg' // Mock image URL for member
            },
            { 
                id: 2, 
                message: 'Sorry to inform you that your request to join Table Tennis club has been rejected!', 
                timestamp: getCurrentTimestamp(),
                imageUrl: 'https://media.self.com/photos/5c360cc973e3cb2ca1e0fd35/4:3/w_2560%2Cc_limit/table-tennis.jpg' // Mock image URL for member
            },
            { 
                id: 3, 
                message: 'New events are available in the club!', 
                timestamp: getCurrentTimestamp(),
                imageUrl: 'https://www.nbc.com/sites/nbcblog/files/styles/scale_862/public/2024/07/paris-2024-olympics-soccer.jpg' // Mock image URL for member
            },
        ];
    }
};

const NotificationList = ({ notifications }) => {
    return (
        <ul className="space-y-4">
            {notifications.map(notification => (
                <li key={notification.id} className="border p-4 rounded-md shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <img src={notification.imageUrl} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                    <div className="flex-grow">
                        <p className="mb-2 sm:mb-0">{notification.message}</p>
                        <span className="text-gray-500 text-sm">{notification.timestamp}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const NotificationPage = () => {
    const location = useLocation(); // Get current location
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Determine user type based on the current path
        const userType = location.pathname.includes('/admin') ? 'admin' : 'member';
        const fetchedNotifications = fetchNotifications(userType); // Fetch notifications based on user type
        setNotifications(fetchedNotifications); // Set notifications state
    }, [location.pathname]);

    return (
        <div className="container mx-auto mt-10 p-4">
            <NotificationList notifications={notifications} />
        </div>
    );
};

export default NotificationPage;
