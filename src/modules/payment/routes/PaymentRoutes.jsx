import React from "react";
import InvoiceCenter from "../pages/InvoiceCenter";
import NavBar from '../../registration/components/NavBarComponents/NavBar';

export default function PaymentRoutes() {
    return [
        {
            path: "", // This is the default route, i.e. /payment/
            element: <InvoiceCenter />, // Load InvoiceCenter component
        },
        {
            path: "invoice-center", // You can still access this page via /payment/invoice-center
            element: <InvoiceCenter />,
        },
        // Add other routes like Payment Gateway here if needed
    ];
}
