import React from "react";
import InvoiceCenter from "../pages/InvoiceCenter";
import PaymentInvoice from "../pages/PaymentInvoice";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import CheckoutCancel from "../pages/CheckoutCancel";
import PartialPayment from '../pages/partialPayment';

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
      path: "/payment/checkout-success",
      element: <CheckoutSuccess />,
    },
    {
      path: "/payment/checkout-cancel",
      element: <CheckoutCancel />,
    },
    {
      path: "/payment/partial-payment/:id/:installmentCount",
      element: <PartialPayment />,
    },
  ];
}
