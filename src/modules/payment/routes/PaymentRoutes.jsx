import React from "react";
import InvoiceCenter from "../pages/InvoiceCenter";
import PaymentInvoice from "../pages/PaymentInvoice";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import CheckoutCancel from "../pages/CheckoutCancel";


export default function PaymentRoutes() {
  return [
    {
      path: "",
      element: <InvoiceCenter />,
    },
    {
      path: "/payment/invoice-center",
      element: <InvoiceCenter />,
    },
    {
      path: "/payment/payment-invoice/:id",
      element: <PaymentInvoice />,
    },
    {
      path: "/payment/checkout-success/:session_id", // เพิ่มการรับ session_id จาก URL
      element: <CheckoutSuccess />,
    },
    {
      path: "/payment/checkout-cancel",
      element: <CheckoutCancel />,
    },
  ];
}

