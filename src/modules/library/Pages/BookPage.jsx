import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import BrowsebookCard from "../components/Card/BrowsebookCard";

function BookPage() {
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const [totalCopies, setTotalCopies] = useState(0);
  const [filteredBooks, setFilteredBooks] = useState([]);
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

  const [remainingCopies, setRemainingCopies] = useState(0);
  const [data, setData] = useState([]);

  // Fetch book duplicates
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

  // Fetch all book data
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/library/book"
      );
      setData(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDuplicate();
    getData();

    // Scroll to top when the page is loaded or route changes
    window.scrollTo(0, 0);
  }, [location.key]); // Re-run on route change

  useEffect(() => {
    if (bookID && bookDuplicate.length > 0) {
      const filteredDuplicates = bookDuplicate.filter(
        (duplicate) => duplicate.book_id === bookID
      );
      setTotalCopies(filteredDuplicates.length);
      setRemainingCopies(filteredDuplicates.filter((dup) => dup.status).length);
    }
  }, [bookID, bookDuplicate]);

  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto">
        <MainNavbar />
        <div className="container mx-auto p-6 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-10">
          {/* Left Section: Book Image and Status */}
          <div className="lg:w-1/3 w-full flex flex-col items-center mb-6">
            <img
              src={coverImage}
              alt={title}
              className="w-full max-w-[250px] h-auto max-h-[600px] object-cover rounded-lg shadow-xl"
            />
            <div className="flex items-center mt-3">
              <h1 className="font-semibold text-left">Reserve Status:</h1>
              <span
                className={`ml-2 text-${totalCopies > 0 ? "green" : "red"}-500`}
              >
                {totalCopies > 0 ? "Available" : "Not Available"}
              </span>
            </div>
            <div className="p-3 mt-2 rounded-xl bg-neutral-100 flex justify-between items-center text-sm w-full max-w-[300px]">
              <h1>Remaining</h1>
              <h1 className="text-orange-500">
                {remainingCopies}/{totalCopies}
              </h1>
            </div>
          </div>

          {/* Right Section: Book Details */}
          <div className="lg:w-2/3 w-full">
            <h1 className="text-2xl font-semibold mb-6">{title}</h1>
            <div className="grid grid-cols-2 -space-x-56 text-gray-600 text-sm">
              <div className="text-base">
                <p>Author</p>
                <p>Publisher</p>
                <p>Edition</p>
                <p>ISBN</p>
                <p>Total Pages</p>
                <p>Publish Date</p>
              </div>
              <div className="text-gray-600  text-base">
                <p>{author}</p>
                <p>{publisher}</p>
                <p>{edition}</p>
                <p>{isbn}</p>
                <p>{pageCount} pages</p>
                <p>{formattedDate}</p>
              </div>
            </div>

            {/* Book Description */}
            <div className="mt-3">
              <h2 className="text-gray-800 text-lg mb-3">Description</h2>
              <p className="text-gray-600 text-base">{description}</p>
            </div>

            {/* Request Button */}
            <div className="mt-6">
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
                  className={`w-[70%] mx-auto lg:mx-0 lg:w-auto flex items-center justify-center px-5 py-1 rounded-full font-semibold border-2 transition-all duration-300 ${
                    totalCopies > 0
                      ? "bg-orange-100 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={totalCopies === 0}
                >
                  Request
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-6 flex flex-col gap-6 items-center rounded-2xl">
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-center">
            Related Books
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {data
              .filter(
                (book) => book.category === category && book.id !== bookID
              )
              .slice(0, 5)
              .map((book) => (
                <BrowsebookCard
                  key={book.id}
                  book={book}
                  bookDuplicate={bookDuplicate}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookPage;
