import NavBar from "../../registration/components/NavBarComponents/NavBar";

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full pt-20 px-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left md:ml-32">
          Payment Cancelled
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-4/5 mx-auto">
          <p className="text-lg">
            Your payment has been cancelled. Please go to Payment Center to try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
