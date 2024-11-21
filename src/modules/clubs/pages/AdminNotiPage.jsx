import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../utils/axiosInstance';

const NotificationList = ({ notifications }) => (
    <ul className="space-y-4">
        {notifications.map(notification => (
            <li key={notification.id} className="border p-4 rounded-md shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <img src={notification.imageUrl || 'https://via.placeholder.com/40'} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                <div className="flex-grow">
                    <p className="mb-2 sm:mb-0">{notification.message}</p>
                    <span className="text-gray-500 text-sm">{new Date(notification.created_at).toLocaleString()}</span>
                </div>
            </li>
        ))}
    </ul>
);

const NotificationPage = () => {
    const location = useLocation();
    const { clubId } = useParams(); // Get clubId from the route
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const userType = location.pathname.includes('/admin') ? 'admin' : 'member';
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get(`/api/clubs/notifications`, {
                    params: {
                        userType,
                        clubId, // Use clubId from the URL
                    },
                });
                setNotifications(response.data.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();
    }, [location.pathname, clubId]);

    return (
        <div className="container mx-auto mt-10 p-4">
            <NotificationList notifications={notifications} />
        </div>
    );
};

export default NotificationPage;