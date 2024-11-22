import React, { useEffect, useState } from "react";
import { fetchEveryBook, fetchReservedBook } from "../services/api"; // Adjust the path to your api.js
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function AdminPage() {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);

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
        startDate: "-",
        endDate: "-",
        reservationStatus: "Available",
      };
    }

    const reservation = reservations.find(
      (item) => item.reserved_book === duplicateId
    );
    return reservation
      ? {
          userId: reservation.user_id,
          startDate: new Date(reservation.start_date).toLocaleDateString(),
          endDate: new Date(reservation.end_date).toLocaleDateString(),
          reservationStatus: reservation.reserve_status,
        }
      : {
          userId: "-",
          startDate: "-",
          endDate: "-",
          reservationStatus: "Unavailable",
        };
  };

  let rowNumber = 0; // To keep track of the sequential numbering

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navbar */}
      <NavBar />

      <main className="pt-16">
        {/* Secondary Navbar */}
        <MainNavbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Books and Duplicates
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Dashboard &gt; Books and Duplicates
          </p>

          {/* Books and Duplicates Table */}
          <div className="bg-white shadow-md rounded-lg mt-8 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Books and Duplicates
            </h2>
            <table className="w-full mt-4 text-gray-800 border-collapse">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="border-b p-2">#</th>
                  <th className="border-b p-2">Image</th>
                  <th className="border-b p-2">Book Title</th>
                  <th className="border-b p-2">ISBN</th>
                  <th className="border-b p-2">Duplicate ID</th>
                  <th className="border-b p-2">Status</th>
                  <th className="border-b p-2">User ID</th>
                  <th className="border-b p-2">Start Date</th>
                  <th className="border-b p-2">End Date</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) =>
                    book.book_duplicate.map((duplicate) => {
                      rowNumber += 1; // Increment row number for each duplicate

                      const { userId, startDate, endDate, reservationStatus } =
                        getReservationDetails(duplicate.id, duplicate.status);

                      return (
                        <tr key={duplicate.id} className="hover:bg-gray-50">
                          <td className="p-2 border-b">{rowNumber}</td>
                          <td className="p-2 border-b">
                            <img
                              src={book.cover_image}
                              alt={book.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="p-2 border-b">{book.title}</td>
                          <td className="p-2 border-b">{book.isbn}</td>
                          <td className="p-2 border-b">{duplicate.id}</td>
                          <td className="p-2 border-b">
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
                          <td className="p-2 border-b">{userId}</td>
                          <td className="p-2 border-b">{startDate}</td>
                          <td className="p-2 border-b">{endDate}</td>
                        </tr>
                      );
                    })
                  )
                ) : (
                  <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-500">
                      No books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
