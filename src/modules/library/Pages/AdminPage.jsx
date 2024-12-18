import React, { useEffect, useState, useRef } from "react";
import {
  fetchEveryBook,
  fetchResData,
  fetchReservedBook,
  returnBook,
} from "../services/api"; // Adjust the path to your api.js
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function AdminPage() {
  const [books, setBooks] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBookData, setScannedBookData] = useState(null);
  const [loadingBook, setLoadingBook] = useState(null);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [scannedBookId, setScannedBookId] = useState(null);
  const [scannedId, setScannedId] = useState(null);

  // Fetch books and reservations on component mount
  const fetchData = async () => {
    try {
      const booksData = await fetchResData();
      
      setBooks(booksData || []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let rowNumber = 0; // To keep track of the sequential numbering

  const handleReturnBook = async (bookId) => {
    setLoadingBook(bookId);
    try {
      const response = await returnBook(scannedBookData.reserve_id, bookId);
      console.log("Book returned successfully!", response);
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
      console.log("Scanned QR Code Result:", result.data); // Log scanned result
      setScannedId(result.data); // Store scanned ID in state
      handleScannedBookData(result.data); // Process the scanned book
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
        setScannedId(result.data); // Store scanned ID in state
        handleScannedBookData(result.data); // Process the scanned book
        qrScannerRef.current.stop();
        setIsCameraOpen(false);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
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

  const handleScannedBookData = (scannedId) => {
    // Find the book whose duplicate matches the scanned ID
    const bookData = books.find(
      (book) => String(book.id) === String(scannedId)
    );

    if (bookData) {
      console.log("Matched Book:", bookData);
      setScannedBookData(bookData);
    } else {
      console.error("No matching book found for scanned ID:", scannedId);
      setScannedBookData(null); // Clear previous data if no match is found
    }
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  return (
    <div className="min-w-[850px] bg-gray-50 font-sans">
      {/* Top Navbar */}
      <NavBar />

      <main className="pt-16 min-w-[850px]">
        {/* Secondary Navbar */}
        <MainNavbar />

        <div className="p-8 font-nunito ">
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
                  <p className="text-sm text-green-500 mt-2">All books</p>
                </div>

                {/* Total Reserved Books */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-lg font-bold">
                    Total Reserved Books
                  </h2>
                  <p className="text-3xl font-bold mt-4">
                    {books.filter((book) => book.status === false).length}
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
                    {books.filter((book) => book.status === true).length}
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
                          (books.filter((book) => book.status === false)
                            .length /
                            books.length) *
                          100
                        ).toFixed(2)
                      : 0}{" "}
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
                      {books.map((book) => {
                        rowNumber++;
                        return (
                          <tr key={book.id}>
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
                                  <div className="font-bold">{book.title}</div>
                                </div>
                              </div>
                            </td>
                            <td>{book.id}</td>
                            <td>
                              <span
                                className={`font-medium ${
                                  book.status === true
                                    ? "text-green-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {book.status === true
                                  ? "Available"
                                  : "Unavailable"}
                              </span>
                            </td>
                            <td>
                              <h1 className="">
                                {book.firstname && book.lastname
                                  ? book.firstname + " " + book.lastname
                                  : "-"}
                              </h1>
                            </td>
                          </tr>
                        );
                      })}
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
              <div className="flex flex-col md:flex-row w-full p-6 gap-6">
                {/* Left Section: QR Scanner */}
                <div className="card rounded-lg flex flex-col items-center p-6 flex-grow bg-white shadow-lg">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className={`w-full max-h-64 mb-4 rounded-lg shadow ${
                      isCameraOpen ? "block" : "hidden"
                    }`}
                  />

                  {/* Open Camera Button */}
                  {!isCameraOpen && (
                    <button
                      onClick={startQrScanner}
                      className="btn bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700"
                    >
                      Open Camera
                    </button>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    onChange={readCodeFromImage}
                    className="file-input file-input-bordered w-full max-w-xs mt-4"
                  />
                </div>

                {/* Divider */}
                <div className="divider divider-horizontal hidden md:block"></div>

                {/* Right Section: Scanned Book Details */}
                <div className="card rounded-lg flex flex-col items-center p-6 flex-grow bg-white shadow-lg">
                  {scannedBookData ? (
                    <div className="text-center space-y-4">
                      {/* Book Details Header */}
                      <h3 className="text-xl font-bold text-gray-800">
                        Book Details
                      </h3>

                      {/* Book Title */}
                      <p className="text-gray-700">
                        <strong>Title:</strong> {scannedBookData.title}
                      </p>

                      {/* Book Cover Image */}
                      {scannedBookData.cover_image ? (
                        <img
                          src={scannedBookData.cover_image}
                          alt={scannedBookData.title}
                          className="w-32 h-48 object-cover rounded-md shadow-md mx-auto"
                        />
                      ) : (
                        <div className="w-32 h-48 bg-gray-200 flex items-center justify-center rounded-md shadow-md">
                          <p className="text-gray-500">No Image</p>
                        </div>
                      )}

                      {/* User Information */}
                      <p className="text-gray-700">
                        <strong>User:</strong>{" "}
                        {scannedBookData.firstname && scannedBookData.lastname
                          ? `${scannedBookData.firstname} ${scannedBookData.lastname}`
                          : "No Reserved User"}
                      </p>

                      {/* Return Button */}
                      <button
                        onClick={async () => {
                          if (isButtonDisabled) return; // Prevent multiple clicks
                          setIsButtonDisabled(true); // Disable button immediately on click

                          try {
                            await handleReturnBook(parseInt(scannedId));
                            // Update the book data to indicate "No Reserved User"
                            setScannedBookData((prevData) => ({
                              ...prevData,
                              firstname: null,
                              lastname: null,
                            }));
                            // Show success alert
                            alert("Book returned successfully!");
                          } catch (error) {
                            console.error("Error returning the book:", error);
                          } finally {
                            setIsButtonDisabled(false); // Re-enable button after processing
                          }
                        }}
                        className={`btn px-6 py-2 font-semibold rounded-lg ${
                          loadingBook === scannedId ||
                          isButtonDisabled ||
                          !scannedBookData.firstname
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        } shadow-md transition duration-200`}
                        disabled={
                          loadingBook === scannedId ||
                          isButtonDisabled ||
                          !scannedBookData.firstname ||
                          !scannedBookData.lastname
                        }
                      >
                        {loadingBook === scannedId || isButtonDisabled
                          ? "Processing..."
                          : "Confirm Return"}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      <p>No matching book found for scanned ID.</p>
                    </div>
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
