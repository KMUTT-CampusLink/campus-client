import React from "react";
import InvoiceCenter from "../pages/InvoiceCenter";
import PaymentInvoice from "../pages/PaymentInvoice";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import CheckoutCancel from "../pages/CheckoutCancel";
import PartialPayment from '../pages/partialPayment';
import AuthRoute from '../../registration/middleware/AuthRoute';

export default function PaymentRoutes() {
  return [
    {
      path: "",
      element: (
        <AuthRoute>
          <InvoiceCenter />
        </AuthRoute>),
    },
    {
      path: "/payment/invoice-center",
      element: (
        <AuthRoute>
          <InvoiceCenter />
        </AuthRoute>),
    },
    {
      path: "/payment/payment-invoice/:id",
      element: (
        <AuthRoute>
          <PaymentInvoice />
        </AuthRoute>),
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
      element: (
        <AuthRoute>
          <PartialPayment />
        </AuthRoute>),
    },
  ];
}
