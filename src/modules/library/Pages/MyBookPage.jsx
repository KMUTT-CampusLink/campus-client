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
      <main className="pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="mx-auto flex font-nunito gap-3">
          {/* Side navbar */}
          <div className="flex flex-col p-3 rounded-lg shadow-xl w-[20%] bg-gray-700">
            <h1 className="text-xl font-bold text-white p-3">My Book</h1>
            <div
              onClick={() => setActiveTab("reserved")}
              className={`font-semibold my-3 hover:bg-white duration-100 text-white rounded-md p-3 ${
                activeTab === "reserved"
                  ? "bg-gray-500 text-black"
                  : "bg-gray-700 hover:text-gray-800"
              }`}
            >
              <h1>Reserved Book</h1>
            </div>
            <div
              onClick={() => setActiveTab("history")}
              className={`font-semibold my-3 hover:bg-white duration-100 text-white rounded-md p-3 ${
                activeTab === "history"
                  ? "bg-gray-500 text-black"
                  : "bg-gray-700 hover:text-gray-800"
              }`}
            >
              <h1>History</h1>
            </div>
          </div>
          {/* Reserved book content */}
          {activeTab === "reserved" && (
            <div className="flex flex-col w-[80%] p-3 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold p-3">
                Reserved <span className="text-orange-500"> Book</span>
              </h2>

              {filteredBooks.length > 0 ? (
                filteredBooks.slice(0, visibleBooks).map((book, index) => (
                  <div
                    key={`${book.id}-${index}`}
                    className=" flex items-start p-4 bg-white rounded-lg scale-95 hover:scale-100 transition duration-300 cursor-pointer"
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
                      {/* <button
                        onClick={() => handleReturnOptionClick(book)}
                        className="btn bg-orange-500 text-white ml-4 px-6 py-3 text-lg"
                      >
                        Return
                      </button> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-lg text-red-500">
                  You currently have no reserved books.
                </p>
              )}

              {/* Return Options Modal */}
              <dialog
                ref={returnOptionsModalRef}
                id="return_options_modal"
                className="modal"
              >
                <div className="modal-box w-[30rem] max-w-screen-lg p-6 bg-white rounded-lg shadow-lg relative">
                  <h3 className="font-bold text-xl text-center mb-4">
                    Return Book Options
                  </h3>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowReturnOptions(false);
                        if (modalRef.current) {
                          modalRef.current.showModal();
                        }
                      }}
                      className="btn bg-gray-800 text-white"
                    >
                      Scan QR Code
                    </button>
                    <button
                      onClick={() => {
                        setShowReturnOptions(false);
                        if (codeEntryModalRef.current) {
                          codeEntryModalRef.current.showModal();
                        }
                      }}
                      className="btn bg-gray-800 text-white"
                    >
                      Enter Code
                    </button>
                  </div>
                  <button
                    className="btn mt-6"
                    onClick={() => returnOptionsModalRef.current.close()}
                  >
                    Close
                  </button>
                </div>
              </dialog>

              {/* Code Entry Modal */}
              <dialog
                ref={codeEntryModalRef}
                id="code_entry_modal"
                className="modal"
              >
                <div className="modal-box w-[30rem] max-w-screen-lg p-6 bg-white rounded-lg shadow-lg relative">
                  <h3 className="font-bold text-xl text-center mb-4">
                    Enter Unlock Code
                  </h3>
                  <div className="flex flex-col items-center mt-4">
                    <input
                      type="text"
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      className="input text-center border border-gray-500 rounded-md p-2"
                      placeholder="Enter Unlock Code"
                    />
                    {pageError && (
                      <p className="text-red-500 text-sm text-center mt-2">
                        {pageError}
                      </p>
                    )}
                    <button
                      onClick={handleEnterCode}
                      className="btn mt-4 bg-orange-500 text-white"
                    >
                      Confirm Code
                    </button>
                  </div>
                  <button
                    className="btn mt-6"
                    onClick={() => codeEntryModalRef.current.close()}
                  >
                    Close
                  </button>
                </div>
              </dialog>

              {/* Qr Code Scan Modal */}
              {selectedBook && (
                <dialog ref={modalRef} id="my_modal_4" className="modal">
                  <div className="modal-box w-[60rem] max-w-screen-lg p-6 bg-white rounded-lg shadow-lg relative">
                    {/* Conditional Alerts */}
                    {result && result === String(selectedBook?.duplicate_id) ? (
                      <div
                        role="alert"
                        className="alert alert-success p-3 bg-green-100 text-green-600 border border-green-600 mb-3 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Success! QR code matched.</span>
                      </div>
                    ) : result ? (
                      <div
                        role="alert"
                        className="alert p-3 bg-red-100 text-red-600 border border-red-600 mb-3 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Incorrect QR code!</span>
                      </div>
                    ) : null}

                    <h3 className="font-bold text-xl text-center mb-2">
                      Return Book
                    </h3>
                    <h2 className="text-center font-bold mb-2">
                      ID#{selectedBook.duplicate_id}
                    </h2>

                    <p className="text-center mb-2">
                      To return the book <br />
                      <strong>{selectedBook.title}</strong>
                      <br /> Scan your saved QR code below
                      <br />
                      Your ref number is{" "}
                      <strong>{selectedBook.reservation_id}</strong>
                    </p>

                    <div className="flex flex-col items-center w-[80%] mx-auto  rounded-lg m-6 p-4 border shadow-lg">
                      {!isCameraOpen && (
                        <div className="translate-y-[3rem] absolute">
                          <div className="flex flex-col items-center text-center">
                            <FontAwesomeIcon
                              icon="fa-solid fa-video "
                              className="text-6xl text-gray-400 mb-4"
                            />
                            <p className="text-gray-500 mb-4">
                              Please Turn on Camera
                            </p>
                          </div>
                        </div>
                      )}
                      <video
                        ref={videoRef}
                        className="  rounded-lg m-4 "
                      ></video>

                      {!isCameraOpen && (
                        <button
                          onClick={startQrScanner}
                          className="btn bg-gray-800 text-white"
                        >
                          Turn on Camera
                        </button>
                      )}
                    </div>

                    <div className="flex justify-center mb-6 bg-white rounded-lg">
                      <input
                        type="file"
                        onChange={(e) => readCode(e)}
                        className="file-input file-input-orange-500 w-full max-w-xs scale-75"
                      />
                    </div>

                    <div className="flex items-center gap-3 justify-center">
                      {result === String(selectedBook?.duplicate_id) && (
                        <button
                          onClick={() => {
                            handleReturnBook(
                              selectedBook.reservation_id,
                              selectedBook.duplicate_id
                            );
                            modalRef.current.close(); // Close the modal after confirming
                          }}
                          disabled={loadingBook === selectedBook.reservation_id} // Disable while loading
                          className={`btn mt-3  ${
                            loadingBook === selectedBook.reservation_id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-600 text-white"
                          }`}
                        >
                          {loadingBook === selectedBook.reservation_id
                            ? "Processing..."
                            : "Confirm Return"}
                        </button>
                      )}
                      <button
                        className="btn mt-3 px-[3rem]"
                        onClick={() => modalRef.current.close()}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
          )}
          {/* History content */}
          {activeTab === "history" && (
            <div className="flex flex-col w-[80%] p-3 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold p-3">
                Book <span className="text-orange-500"> History</span>
              </h2>
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
              {reservedBook.filter((book) => book.user_id).length > 0 && (
                <div className="flex items-center justify-center mt-4 gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn bg-gray-300 text-gray-800 px-4 py-2"
                  >
                    &lt;
                  </button>
                  {Array.from(
                    { length: Math.min(totalPages, 5) },
                    (_, index) => {
                      let pageNumber;
                      if (currentPage <= 3 || totalPages <= 5) {
                        pageNumber = index + 1;
                      } else if (currentPage > totalPages - 3) {
                        pageNumber = totalPages - 4 + index;
                      } else {
                        pageNumber = currentPage - 2 + index;
                      }
                      return (
                        <button
                          key={index}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`btn ${
                            currentPage === pageNumber
                              ? "bg-orange-500 text-white"
                              : "bg-gray-300 text-gray-800"
                          } px-4 py-2`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                  )}
                  {totalPages > 5 && (
                    <span
                      className="text-gray-800 px-4 py-2 cursor-pointer bg-gray-300 rounded-md hover:bg-gray-400 hover:text-black transition duration-200"
                      onClick={() => setShowPagePopup(true)}
                    >
                      Go to
                    </span>
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn bg-gray-300 text-gray-800 px-4 py-2"
                  >
                    &gt;
                  </button>
                </div>
              )}
              {showPagePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div
                    ref={popupRef}
                    className="bg-white p-6 w-[18rem] max-w-full rounded-lg shadow-lg relative"
                  >
                    <button
                      onClick={() => setShowPagePopup(false)}
                      className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
                    >
                      Close
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-center">
                      Go to Page
                    </h2>
                    <div className="flex justify-center mb-4">
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageInputValue}
                        onChange={(e) => setPageInputValue(e.target.value)}
                        className="input w-1/3 text-center border border-gray-300 rounded-md"
                      />
                    </div>
                    {pageError && (
                      <p className="text-red-500 text-sm text-center mb-4">
                        {pageError}
                      </p>
                    )}
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handlePageChange(Number(pageInputValue))}
                        className="btn bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyBookPage;
