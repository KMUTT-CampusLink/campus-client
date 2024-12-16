import React, { useEffect, useState, useRef } from "react";
import { fetchEveryBook, fetchReservedBook, returnBook } from "../services/api"; // Adjust the path to your api.js
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function AdminPage() {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBookData, setScannedBookData] = useState(null);
  const [loadingBook, setLoadingBook] = useState(null);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [scannedBookId, setScannedBookId] = useState(null);

  // Fetch books and reservations on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await fetchEveryBook();
        const reservationData = await fetchReservedBook();
        setBooks(booksData || []); // Ensure data is an array
        setReservations(reservationData || []); // Ensure reservation data is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getReservationDetails = (duplicateId, duplicateStatus) => {
    if (duplicateStatus) {
      return {
        userId: "-",
        reservationStatus: "Available",
      };
    }

    const reservation = reservations.find(
      (item) => item.reserved_book === duplicateId
    );
    return reservation
      ? {
          userId: reservation.user_id,
          reservationStatus: reservation.reserve_status,
        }
      : {
          userId: "-",
          reservationStatus: "Unavailable",
        };
  };

  let rowNumber = 0; // To keep track of the sequential numbering

  const handleReturnBook = async (bookId) => {
    setLoadingBook(bookId);
    try {
      const reservation = reservations.find(
        (item) => item.reserved_book === bookId
      );
      if (!reservation) {
        throw new Error("No reservation found for the scanned book ID.");
      }
      const response = await returnBook(reservation.reservation_id, bookId);
      console.log("Book returned successfully!", response);

      // Remove the returned book from reservations
      setReservations((prevReservations) =>
        prevReservations.filter(
          (item) => item.reserved_book !== reservation.reserved_book
        )
      );
    } catch (error) {
      console.error("Error returning the book:", error);
    } finally {
      setLoadingBook(null);
    }
  };

  const readCodeFromImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      setScannedBookId(result.data); // Update scanned book ID
      handleScannedBookData(result.data);
    } catch (error) {
      console.error("Error scanning QR code from image:", error);
    }
  };
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startQrScanner = () => {
    if (!videoRef.current) {
      console.error("Video element not found.");
      return;
    }

    setIsCameraOpen(true);

    qrScannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        console.log("QR Code Result:", result.data); // Log scanned result
        setScannedBookId(result.data);
        handleScannedBookData(result.data);
        qrScannerRef.current.stop();
        setIsCameraOpen(false);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true, // Adds visual feedback for the scan region
        highlightCodeOutline: true, // Highlights detected QR codes
        // Restrict scan area to a specific region
        preferredScanArea: {
          x: 0.25, // 25% from the left
          y: 0.25, // 25% from the top
          width: 0.5, // 50% of the video width
          height: 0.5, // 50% of the video height
        },
      }
    );

    qrScannerRef.current.start();
  };

  const stopQrScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      setIsCameraOpen(false);
    }
  };

  const handleScannedBookData = (bookId) => {
    const bookData = books.flatMap((book) =>
      book.book_duplicate.filter((dup) => String(dup.id) === bookId)
    )[0];
    setScannedBookData(bookData || null); // Update scanned book data
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navbar */}
      <NavBar />

      <main className="pt-16">
        {/* Secondary Navbar */}
        <MainNavbar />

        <div className="p-8 font-nunito">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>

          {/* Tabs */}
          <div role="tablist" className="tabs tabs-lifted">
            {/* Tab 1: Statistics */}
            <input
              type="radio"
              name="admin_tabs"
              role="tab"
              className="tab"
              aria-label="Status"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-white border rounded-lg p-6"
            >
              {/* Statistic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Books */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-lg font-bold">
                    Total Books
                  </h2>
                  <p className="text-3xl font-bold mt-4">{books.length}</p>
                  <p className="text-sm text-green-500 mt-2">
                    All unique books
                  </p>
                </div>

                {/* Total Reserved Books */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-lg font-bold">
                    Total Reserved Books
                  </h2>
                  <p className="text-3xl font-bold mt-4">
                    {
                      reservations.filter(
                        (item) => item.reserve_status === "Reserved"
                      ).length
                    }
                  </p>
                  <p className="text-sm text-yellow-500 mt-2">
                    Currently reserved
                  </p>
                </div>

                {/* Total Available Books */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-lg font-bold">
                    Total Available Books
                  </h2>
                  <p className="text-3xl font-bold mt-4">
                    {books.reduce(
                      (acc, book) =>
                        acc +
                        book.book_duplicate.filter((dup) => dup.status).length,
                      0
                    )}
                  </p>
                  <p className="text-sm text-blue-500 mt-2">
                    Available for borrowing
                  </p>
                </div>

                {/* Reservation Rate */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-lg font-bold">
                    Reservation Rate
                  </h2>
                  <p className="text-3xl font-bold mt-4">
                    {books.length > 0
                      ? (
                          (reservations.filter(
                            (item) => item.reserve_status === "Reserved"
                          ).length /
                            books.reduce(
                              (acc, book) => acc + book.book_duplicate.length,
                              0
                            )) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-red-500 mt-2">Books reserved</p>
                </div>
              </div>

              <div className="">
                <h2 className="text-xl font-bold text-gray-800 my-6">
                  Reservation Status
                </h2>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* Table Head */}
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Book</th>
                        <th>Book_ID</th>
                        <th>Status</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.length > 0 ? (
                        books.map((book) =>
                          book.book_duplicate.map((duplicate) => {
                            const { userId, reservationStatus } =
                              getReservationDetails(
                                duplicate.id,
                                duplicate.status
                              );

                            rowNumber++; // Increment row number for each row

                            return (
                              <tr key={duplicate.id}>
                                <td>
                                  <h1 className="flex items-center gap-3 font-bold">
                                    {rowNumber}
                                  </h1>
                                </td>
                                <td>
                                  <div className="flex items-center gap-3">
                                    <div className="avatar">
                                      <div className="w-16 h-16 object-cover rounded">
                                        <img
                                          src={book.cover_image}
                                          alt={book.title}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-bold">
                                        {book.title}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>{duplicate.id}</td>
                                <td>
                                  <span
                                    className={`font-medium ${
                                      reservationStatus === "Available"
                                        ? "text-green-500"
                                        : "text-yellow-500"
                                    }`}
                                  >
                                    {reservationStatus}
                                  </span>
                                </td>
                                <td>
                                  <h1 className="">{userId}</h1>
                                </td>
                              </tr>
                            );
                          })
                        )
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-gray-500">
                            No books found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tab 2:  */}
            <input
              type="radio"
              name="admin_tabs"
              role="tab"
              className="tab"
              aria-label="Scanner"
            />
            <div
              role="tabpanel"
              className="tab-content bg-white border rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                Scan QR code to return book
              </h2>
              <p className="text-gray-600">
                Upload an image or scan a photo of QR code to return the book
              </p>
              <div className="flex w-full p-3">
                {/* Left Section: QR Scanner */}
                <div className="card rounded-box grid p-6 flex-grow place-items-center bg-white shadow-xl">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className={`w-full ${isCameraOpen ? "block" : "hidden"}`}
                  />

                  {/* Open Camera Button */}
                  {!isCameraOpen && (
                    <button
                      onClick={startQrScanner}
                      className="btn bg-gray-800 text-white"
                    >
                      Open Camera
                    </button>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    onChange={readCodeFromImage}
                    className="file-input file-input-bordered w-[40%] mt-4   "
                  />
                </div>

                {/* Divider */}
                <div className="divider divider-horizontal"></div>

                {/* Right Section: Scanned Book Details */}
                <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
                  {scannedBookData ? (
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800">
                        Book Details
                      </h3>
                      <p>ID: {scannedBookData.id}</p>
                      <p>Title: {scannedBookData.title}</p>
                      <button
                        onClick={() => handleReturnBook(scannedBookData.id)}
                        className={`btn mt-4 ${
                          loadingBook === scannedBookData.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                        disabled={loadingBook === scannedBookData.id}
                      >
                        {loadingBook === scannedBookData.id
                          ? "Processing..."
                          : "Confirm Return"}
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-600">No book scanned yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
