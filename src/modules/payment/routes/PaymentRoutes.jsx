import React from "react";
import InvoiceCenter from "../pages/InvoiceCenter";
import PaymentInvoice from "../pages/PaymentInvoice";

export default function PaymentRoutes() {
  return [
    {
      path: "", 
      element: <InvoiceCenter />,
    },
    {
      path: "invoice-center", 
      element: <InvoiceCenter />,
    },
    {
      path: "payment-invoice/:id", 
      element: <PaymentInvoice />,
    },
  ];
}
