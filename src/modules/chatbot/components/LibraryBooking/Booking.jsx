import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeReservation } from '../../../library/services/api.js';
import popToast from "../../../../utils/popToast.js";

const Booking = ({bookdata}) => {
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const generateUnlockCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let unlockCode = "";
    for (let i = 0; i < 7; i++) {
      unlockCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return unlockCode;
  };

  const handleReservation = async () => {
    if (!bookdata.bdid) {
      console.error("No matching book duplicate found or status is not true.");
      return;
    }

    setIsLoading(true); // Set loading to true to disable the button

    const unlockCode = generateUnlockCode(); // Generate the 7-digit unlock code

    const reservationData = {
      status: "Reserved",
      book_duplicate_id: bookdata.bdid,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      unlock_code: unlockCode, // Add the unlock code to the reservation data
    };

    try {
      const response = await makeReservation(reservationData); // Use the API function
      console.log("Reservation successful:", response);
      if (response.data.status === "Reserved"){
        popToast("Book is reserved", "success");
      } else {
        popToast("Error during reservation", "error");
      }
      setIsClicked(true);
      // Navigate to MyBook page after QR code download
      // navigate("../library/mybook");
    } catch (error) {
      console.error("Error during reservation:", error);
    } finally {
      setIsLoading(false); // Reset loading state after request completes
      document.getElementById("my_modal_4").close(); // Close modal after confirmation
    }
  };

  useEffect(() => {
      const today = new Date();
      const formattedToday = today.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
      setTodayDate(formattedToday);
      setIsClicked(false);
      const returnDay = new Date();
      returnDay.setDate(today.getDate() + 7);
      const formattedReturnDate = returnDay.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
      setReturnDate(formattedReturnDate);
    }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="btn m-6 bg-orange-500 text-white border-orange-600 hover:bg-orange-600"
              >
                Reserve
              </button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="font-bold text-xl text-center mb-4">
                    Confirmation
                  </h3>

                  <p className="text-center mb-2">
                    Your book <strong>{bookdata.title}</strong> has been reserved. <br />
                    Reserved Date
                    <span className="text-orange-600 font-semibold block">
                      {todayDate}
                    </span>
                  </p>

                  <div className="border border-orange-500 bg-orange-100 text-orange-700 p-4 rounded-lg text-center mb-4">
                    If not returned by <strong>{returnDate}</strong>, you will
                    be banned from accessing our library.
                  </div>
                  <div className="mx-auto justify-center items-center flex">
                    <img src={bookdata.cover_image} alt="" />
                  </div>
                  <div className="modal-action flex justify-center gap-3">
                    <button
                      onClick={handleReservation}
                      disabled={isLoading} // Disable when loading
                      className={`btn bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? "Processing..." : "Confirm"}
                    </button>

                    <button
                      onClick={() =>
                        document.getElementById("my_modal_4").close()
                      }
                      className="btn px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </dialog>
    </div>
  )
}

export default Booking