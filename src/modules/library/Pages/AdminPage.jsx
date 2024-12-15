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

          {/* Statistic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Books */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500 text-lg font-bold">Total Books</h2>
              <p className="text-3xl font-bold mt-4">{books.length}</p>
              <p className="text-sm text-green-500 mt-2">All unique books</p>
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
              <p className="text-sm text-yellow-500 mt-2">Currently reserved</p>
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

          {/* Books and Duplicates Table */}
          <div className="bg-white shadow-md rounded-lg mt-8 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
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
                      book.book_duplicate.map((duplicate, index) => {
                        const { userId, reservationStatus } =
                          getReservationDetails(duplicate.id, duplicate.status);

                        return (
                          <tr key={duplicate.id}>
                            <td>
                              <h1 className="flex items-center gap-3 font-bold">
                                {index + 1}
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
                              <button className="btn btn-ghost btn-xs">
                                {userId}
                              </button>
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
      </main>
    </div>
  );
}

export default AdminPage;
