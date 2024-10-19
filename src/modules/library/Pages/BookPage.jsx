import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
function BookPage() {
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const [totalCopies, setTotalCopies] = useState(0);

  const getDuplicate = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/library/bookDupe"
      );
      setBookDuplicate(response.data);
    } catch (error) {
      console.error("Error fetching book duplicate:", error);
    }
  };

  useEffect(() => {
    getDuplicate();
  }, []);

  const location = useLocation();
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
    category,
  } = location.state || {};

  // Calculate total copies based on the current bookID
  useEffect(() => {
    if (bookID && bookDuplicate.length > 0) {
      // Filter duplicates where book_id matches and status is true
      const filteredDuplicates = bookDuplicate.filter(
        (duplicate) => duplicate.book_id === bookID && duplicate.status
      );
      setTotalCopies(filteredDuplicates.length);
    }
  }, [bookID, bookDuplicate]);

  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className=" pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="bg-neutral-100 p-6">
          <div className="container mx-auto p-12 bg-white rounded-2xl shadow-xl">
            {location.state ? (
              <>
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                  <div className="lg:ml-6 w-full lg:w-2/3">
                    <h1 className="text-4xl font-semibold mb-4">{title}</h1>
                    <h2 className="text-2xl font-semibold mb-2 text-slate-500">
                      <span>By </span>
                      {author}
                    </h2>

                    <hr className="p-2" />
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-md mb-2">
                        <span
                          className={`text-2xl ${
                            totalCopies > 0
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {totalCopies > 0
                            ? "Available to Reserve"
                            : "Not Available to Reserve"}
                        </span>
                      </p>
                      <Link
                        to={`/library/request/${title}`}
                        state={{
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
                        }}
                      >
                        <button
                          className={`my-3 flex items-center p-2 px-6 bg-orange-100 rounded-full font-semibold text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ${
                            totalCopies === 0
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={totalCopies === 0}
                        >
                          Request
                        </button>
                      </Link>
                    </div>

                    <hr className="p-2" />
                    <div className="text-2xl p-3">
                      <p className="text-md mb-2">
                        <strong>ISBN:</strong> {isbn}
                      </p>
                      <p className="text-md mb-2">
                        <strong>Edition No:</strong> {edition}
                      </p>
                      <p className="text-md mb-2">
                        <strong>Publisher:</strong> {publisher}
                      </p>
                      <p className="text-md mb-2">
                        <strong>Publish Date:</strong> {formattedDate}
                      </p>
                      <p className="text-md mb-2">
                        <strong>Page Count:</strong> {pageCount}
                      </p>
                      {/* Displaying total available copies */}
                      <p className="text-md mb-2">
                        <strong>Total Copies Available:</strong> {totalCopies}
                      </p>
                    </div>

                    <hr className="p-2" />
                  </div>
                </div>
              </>
            ) : (
              <p>No book data available.</p>
            )}
          </div>
          <div className="p-6 flex justify-center font-bold">
            <h1 className="text-4xl underline underline-offset-[1.5rem] decoration-orange-500 mt-6">
              Description
            </h1>
          </div>
          <div className="container mx-auto bg-white p-12 shadow-xl rounded-2xl mb-12 flex justify-center items-center">
            <p className="text-2xl mb-4 items-center">{description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookPage;
