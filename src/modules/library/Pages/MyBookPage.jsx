import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import QrScanner from "qr-scanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchReservedBook, returnBook } from "../services/api";

function MyBookPage() {
  const [reservedBook, setReservedBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(null);
  const [activeTab, setActiveTab] = useState("reserved");
  const [result, setResult] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleBooks, setVisibleBooks] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageInput, setShowPageInput] = useState(false);
  const [showPagePopup, setShowPagePopup] = useState(false);
  const [pageInputValue, setPageInputValue] = useState("");
  const [pageError, setPageError] = useState("");
  const [showReturnOptions, setShowReturnOptions] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const modalRef = useRef(null); // Create a ref for the modal
  const popupRef = useRef(null); // Create a ref for the page input popup
  const returnOptionsModalRef = useRef(null); // Create a ref for the return options modal
  const codeEntryModalRef = useRef(null); // Create a ref for the code entry modal

  useEffect(() => {
    console.log("Scanned result:", result);
    console.log("Duplicate ID:", selectedBook?.duplicate_id);
    console.log("Same?", result == selectedBook?.duplicate_id);
  }, [result, selectedBook]);

  useEffect(() => {
    const loadReservedBooks = async () => {
      try {
        const reservedBooks = await fetchReservedBook(); // Use the function from api.js
        if (reservedBooks) {
          setReservedBook(reservedBooks); // Set the reserved books
        }
      } catch (error) {
        console.error("Error loading reserved books:", error);
      }
    };

    loadReservedBooks();
  }, []);

  const handleReturnBook = async (reservationId, duplicateId) => {
    setLoadingBook(reservationId);

    try {
      const response = await returnBook(reservationId, duplicateId); // Use the API function
      console.log("Book returned successfully!", response);
      setReservedBook((prevBooks) =>
        prevBooks.filter((book) => book.reservation_id !== reservationId)
      );
    } catch (error) {
      console.error("Error returning the book:", error);
    } finally {
      setLoadingBook(null);
    }
  };

  const filteredBooks = reservedBook.filter(
    (book) => book.user_id && book.reserve_status === "Reserved"
  );

  const readCode = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => setResult(result.data))
      .catch((e) => console.log(e));
  };

  const videoRef = useRef(null); // Ref for video element
  const qrScannerRef = useRef(null); // Ref for qrScanner instance

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // Function to start the QR scanner
  const startQrScanner = () => {
    if (videoRef.current) {
      setIsCameraOpen(true); // Hide the button when the camera starts
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (scannedResult) => {
          setResult(scannedResult.data);
          qrScannerRef.current.stop(); // Stop the scanner once a code is detected
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScannerRef.current.start();
    }
  };

  // Function to stop the QR scanner
  const stopQrScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
  };

  // Clean up the QR scanner when the component unmounts
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
    };
  }, []);

  // Track if the camera is open

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      setPageError("The Page Doesn't Exist");
      return;
    }
    setCurrentPage(page);
    setVisibleBooks(page * 10);
    setShowPageInput(false);
    setShowPagePopup(false);
    setPageError("");
  };

  const totalPages = Math.ceil(
    reservedBook.filter((book) => book.user_id).length / 10
  );

  const handleReturnOptionClick = (book) => {
    setSelectedBook(book);
    if (returnOptionsModalRef.current) {
      returnOptionsModalRef.current.showModal();
    }
  };

  const handleEnterCode = async () => {
    if (enteredCode === selectedBook?.unlock_id) {
      await handleReturnBook(
        selectedBook.reservation_id,
        selectedBook.duplicate_id
      );
      if (codeEntryModalRef.current) {
        codeEntryModalRef.current.close();
      }
      setEnteredCode("");
      setPageError("");
    } else {
      setPageError("Incorrect Code");
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto">
        <MainNavbar />
        <div className="mx-auto font-nunito p-6">
          <div className="container mx-auto bg-white w-[80%] scale-105 mt-3">
            {/* Tab Navigation */}
            <div className="tabs tabs-lifted tabs-lg w-auto inline-flex">
              <a
                className={`tab ${
                  activeTab === "reserved" ? "tab-active  " : ""
                }`}
                onClick={() => setActiveTab("reserved")}
              >
                Reserved Book
              </a>
              <a
                className={`tab ${
                  activeTab === "history" ? "tab-active  " : ""
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </a>
            </div>

            {/* Reserved Book Tab Content */}
            {activeTab === "reserved" && (
              <div className="mt-4">
                {filteredBooks.length > 0 ? (
                  filteredBooks.slice(0, visibleBooks).map((book, index) => (
                    <div
                      key={`${book.id}-${index}`}
                      className="flex items-start p-4 bg-white rounded-lg scale-95 hover:scale-100 transition duration-300"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={book.cover_image}
                          alt={`${book.title} cover`}
                          className="w-[8rem] h-[12rem] object-cover shadow-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {book.title}
                        </h3>
                        <p className="text-green-500 mb-1 badge border border-green-500 px-3">
                          {book.reserve_status}
                        </p>
                        <p className="text-sm text-gray-600">
                          Reservation ID: {book.duplicate_id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Edition: {book.edition || "Unspecified"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Author: {book.author || "Unspecified"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Publisher: {book.publisher || "Unspecified"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Reserved Date:{" "}
                          <span className="font-semibold">
                            {new Date(book.start_date).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Return Date:{" "}
                          <span className="font-semibold">
                            {new Date(book.end_date).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg text-red-500">
                    You currently have no reserved books.
                  </p>
                )}
              </div>
            )}

            {/* History Tab Content */}
            {activeTab === "history" && (
              <div className="mt-4">
                {reservedBook.length > 0 ? (
                  reservedBook
                    .filter((book) => book.user_id)
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((book, index) => (
                      <div
                        key={`${book.id}-${index}`}
                        className="flex items-start p-4 bg-white rounded-lg scale-95 hover:scale-100 transition duration-300"
                      >
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={book.cover_image}
                            alt={`${book.title} cover`}
                            className="w-[8rem] h-[12rem] object-cover shadow-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {book.title}
                          </h3>
                          <p
                            className={`mb-1 badge px-3 border ${
                              book.reserve_status === "Reserved"
                                ? "text-green-500 border-green-500"
                                : "text-yellow-500 border-yellow-500"
                            }`}
                          >
                            {book.reserve_status}
                          </p>
                          <p className="text-sm text-gray-600">
                            Reservation ID: {book.duplicate_id}
                          </p>
                          <p className="text-sm text-gray-600">
                            Edition: {book.edition || "Unspecified"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Author: {book.author || "Unspecified"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Publisher: {book.publisher || "Unspecified"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Reserved Date:{" "}
                            <span className="font-semibold">
                              {new Date(book.start_date).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Return Date:{" "}
                            <span className="font-semibold">
                              {new Date(book.end_date).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-lg text-red-500">
                    You currently have no history of borrowed books.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyBookPage;
