import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/axiosInstance';

const NotificationList = ({ notifications }) => (
    <ul className="space-y-4">
        {notifications.map(notification => (
            <li key={notification.id} className="border p-4 rounded-md shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-grow">
                    <p className="mb-2">{notification.message}</p>
                    <span className="text-gray-500 text-sm">{new Date(notification.created_at).toLocaleString()}</span>
                </div>
            </li>
        ))}
    </ul>
);

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/clubs/notifications');
                setNotifications(response.data.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <NotificationList notifications={notifications} />
        </div>
    );
};

export default NotificationPage;