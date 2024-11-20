import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from '../../../utils/axiosInstance';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import QRCode from "react-qr-code";

function RequestPage() {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirection

  const {
    bookID,
    title,
    author,
    coverImage,
    description,
    publisher,
    publishDate,
    pageCount,
    isbn,
    edition,
    totalCopies,
    category,
  } = location.state || {};

  const [todayDate, setTodayDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const [selectedDuplicateID, setSelectedDuplicateID] = useState(null); // To store the matched book_duplicate ID
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const downloadQRCode = () => {
    const svg = document.getElementById("QRCode");
    if (!svg) {
      console.error("SVG element with ID 'QRCode' not found.");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      downloadLink.download = `QRCode for BookID:${selectedDuplicateID}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const getDuplicate = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/library/bookDupe"
      );
      setBookDuplicate(response.data);

      const matchingBook = response.data.find(
        (book) => book.book_id === bookID && book.status === true
      );
      if (matchingBook) {
        setSelectedDuplicateID(matchingBook.id);
      }
    } catch (error) {
      console.error("Error fetching book duplicate:", error);
    }
  };

  useEffect(() => {
    getDuplicate();
  }, [bookID]);

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
    setTodayDate(formattedToday);

    const returnDay = new Date();
    returnDay.setDate(today.getDate() + 7);
    const formattedReturnDate = returnDay.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
    setReturnDate(formattedReturnDate);
  }, []);

  const handleReservation = async () => {
    if (!selectedDuplicateID) {
      console.error("No matching book duplicate found or status is not true.");
      return;
    }

    setIsLoading(true); // Set loading to true to disable the button

    const reservationData = {
      status: "Reserved",
      user_id: "9ea13823-6a05-4d2f-8116-26345d8d7047",
      book_duplicate_id: selectedDuplicateID,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/library/reservations",
        reservationData
      );
      console.log("Reservation successful:", response.data);
      downloadQRCode(); // Download the QR code after successful reservation

      // Navigate to MyBook page after QR code download
      navigate("/library/mybook");
    } catch (error) {
      console.error("Error during reservation:", error);
    } finally {
      setIsLoading(false); // Reset loading state after request completes
      document.getElementById("my_modal_4").close(); // Close modal after confirmation
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-16 pb-6 mx-auto -z-10">
        <MainNavbar />
        {/* Blurred Background Image */}
        <div className="relative h-36 w-full font-nunito">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center blur-md opacity-70"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url(${coverImage})`,
              filter: "blur(15px)",
            }}
          ></div>
        </div>

        <div className="container w-[90%] mx-auto font-nunito ">
          <div className="flex gap-3 p-3 ">
            <div className="w-[70%] flex flex-col">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <span className="badge-outline badge mb-2 border-orange-500 text-orange-500">
                {category}
              </span>
              <p className="text-lg text-neutral-600 font-semibold">
                Description
              </p>
              <p className="text-neutral-500">{description}</p>

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
                    Your book <strong>{title}</strong> has been reserved. <br />
                    Reserved Date
                    <span className="text-orange-600 font-semibold block">
                      {todayDate}
                    </span>
                  </p>

                  <div className="border border-orange-500 bg-orange-100 text-orange-700 p-4 rounded-lg text-center mb-4">
                    If not returned by <strong>{returnDate}</strong>, you will
                    be banned from accessing our library.
                  </div>

                  <p className="text-center mb-4">
                    Use QR Code below to scan when returning the
                    reserved book. <span className="text-gray-900 font-semibold"> It will automatically download after confirmation</span>
                  </p>

                  <div className="flex justify-center mb-6 p-4 bg-white rounded-lg">
                    <QRCode
                      id="QRCode"
                      value={
                        selectedDuplicateID
                          ? selectedDuplicateID.toString()
                          : "No ID available"
                      }
                      size={160}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="Q"
                    />
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

            <div className="flex flex-col items-center rounded-xl w-[25%] p-4 -translate-y-[7rem]">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-auto rounded-t-lg mb-4 object-cover"
              />

              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Book Details
                </h3>
              </div>

              <div className="text-gray-700 text-sm w-full">
                <div className="flex justify-between py-1">
                  <span className="font-medium">Available Copies</span>
                  <span>{totalCopies}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Author</span>
                  <span>{author}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Total Page</span>
                  <span>{pageCount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">BookID</span>
                  <span>{bookID}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RequestPage;
