import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function MyBookPage() {
  const [reservedBook, setReservedBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(null); // State to track loading for each book
  const user_id = "9ea13823-6a05-4d2f-8116-26345d8d7047";

  useEffect(() => {
    const fetchReservedBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/library/allDupe`
        );
        setReservedBook(response.data);
      } catch (error) {
        console.error("Error fetching ReservedBook:", error);
      }
    };

    fetchReservedBook();
  }, []);

  const handleReturnBook = async (reservationId, duplicateId) => {
    setLoadingBook(reservationId); // Set loading state for the clicked book
    const returnedBookData = {
      status: "Returned",
      reservation_id: reservationId,
      duplicateId: duplicateId, // Ensure this is correct
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/library/returnBook`,
        returnedBookData
      );
      console.log("Book returned successfully!", response.data);
      // Optionally, remove the book from the list once returned
      setReservedBook((prevBooks) =>
        prevBooks.filter((book) => book.reservation_id !== reservationId)
      );
    } catch (error) {
      console.error("Error returning the book:", error);
    } finally {
      setLoadingBook(null); // Reset loading state
    }
  };

  // Filter the books that match the user_id and have a "Reserved" status
  const filteredBooks = reservedBook.filter(
    (book) => book.user_id === user_id && book.reserve_status === "Reserved"
  );

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            My Reserved Books
          </h1>

          {filteredBooks.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book, index) => (
                <div
                  key={`${book.id}-${index}`}
                  className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={book.cover_image}
                      alt={`${book.title} cover`}
                      className="w-32 h-48 object-cover mb-4 rounded"
                    />
                    <h2 className="text-xl font-semibold text-center">
                      {book.title}
                    </h2>
                    <p className="text-gray-700 mt-2">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Reservation ID:</strong> {book.reservation_id}
                    </p>
                    <p className="text-gray-700">
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                    <p className="text-gray-700">
                      <strong>Edition:</strong> {book.edition}
                    </p>
                    <p className="text-gray-700">
                      <strong>Pages:</strong> {book.no_of_page}
                    </p>
                    <p className="text-gray-700">
                      <strong>Publisher:</strong> {book.publisher}
                    </p>
                    <p className="text-gray-700">
                      <strong>Publish Date:</strong>{" "}
                      {new Date(book.publish_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <strong>Reservation Status:</strong> {book.reserve_status}
                    </p>
                    <p className="text-gray-700">
                      <strong>Reserved Date:</strong>{" "}
                      {new Date(book.start_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Return Date:</strong>{" "}
                      {new Date(book.end_date).toLocaleDateString()}
                    </p>
                    <button
                      className={`btn btn-primary bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-full w-full transition-colors ${
                        loadingBook === book.reservation_id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        handleReturnBook(book.reservation_id, book.duplicate_id)
                      }
                      disabled={loadingBook === book.reservation_id} // Disable the button while loading
                    >
                      {loadingBook === book.reservation_id
                        ? "Returning..."
                        : "Return Book"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-red-500">
              You currently have no reserved books.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyBookPage;
