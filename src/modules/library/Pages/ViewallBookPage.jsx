import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from '../../../utils/axiosInstance';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import BrowsebookCard from "../components/Card/BrowsebookCard";
import BrowsebookCardList from "../components/Card/BrowsebookCardList";

function ViewallBookPage() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("relevant");
  const [displayedBooks, setDisplayedBooks] = useState(12);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/library/book"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const getDuplicate = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/library/bookDupe"
        );
        setBookDuplicate(response.data);
      } catch (error) {
        console.error("Error fetching book duplicates:", error);
      }
    };
    getDuplicate();
  }, []);

  // Filter and sort books based on the category, filters, and sorting criteria
  useEffect(() => {
    if (data.length > 0) {
      let filteredBooks;

      // Handle "New Arrivals" by filtering books created within the current month
      if (category === "New Arrivals") {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        filteredBooks = data.filter((book) => {
          const bookDate = new Date(book.created_at);
          return (
            bookDate.getMonth() === currentMonth &&
            bookDate.getFullYear() === currentYear
          );
        });
      } else {
        // Filter by specific category
        filteredBooks = data.filter((book) => book.category === category);
      }

      // Apply additional filters for authors, years, and categories
      if (selectedAuthors.length > 0) {
        filteredBooks = filteredBooks.filter((book) =>
          selectedAuthors.includes(book.author)
        );
      }

      if (selectedYears.length > 0) {
        filteredBooks = filteredBooks.filter((book) =>
          selectedYears.includes(
            new Date(book.publish_date).getFullYear().toString()
          )
        );
      }

      if (selectedCategories.length > 0) {
        filteredBooks = filteredBooks.filter((book) =>
          selectedCategories.includes(book.category)
        );
      }

      // Sort results based on the selected criteria
      filteredBooks.sort((a, b) => {
        switch (sortCriteria) {
          case "alphabetical":
            return a.title.localeCompare(b.title);
          case "upload_date":
            return new Date(b.created_at) - new Date(a.created_at);
          case "publish_date_oldest":
            return new Date(a.publish_date) - new Date(b.publish_date);
          case "publish_date_newest":
            return new Date(b.publish_date) - new Date(a.publish_date);
          default:
            return 0;
        }
      });

      setSearchResults(filteredBooks);
    }
  }, [
    data,
    category,
    selectedAuthors,
    selectedYears,
    selectedCategories,
    sortCriteria,
  ]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto">
        <MainNavbar />
        <div className="container mx-auto p-6 flex flex-col md:flex-row-reverse gap-6">
          <div className="w-[33rem] md:w-3/4 mx-auto rounded-lg bg-white">
            <div className="flex mx-auto w-[90%] flex-col">
              <h1 className="text-3xl font-medium mt-6 mb-3 text-center md:text-left">
                {category === "New Arrivals"
                  ? "New Arrivals"
                  : `${category} Books`}
              </h1>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-3 space-y-3 sm:space-y-0 sm:space-x-4">
                <p className="text-neutral-500 font-light">
                  Found: {searchResults.length} titles
                </p>
                <div className="flex items-center gap-4">
                  {/* Sort By */}
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-sm bg-white border border-gray-300 text-gray-700 w-full sm:w-auto"
                    >
                      Sort By: {sortCriteria}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 mt-3 z-50"
                    >
                      <li onClick={() => handleSortChange("relevant")}>
                        <a>Relevant</a>
                      </li>
                      <li onClick={() => handleSortChange("alphabetical")}>
                        <a>Alphabetical</a>
                      </li>
                      <li onClick={() => handleSortChange("upload_date")}>
                        <a>Upload Date</a>
                      </li>
                      <li
                        onClick={() => handleSortChange("publish_date_oldest")}
                      >
                        <a>Publish Date (Oldest)</a>
                      </li>
                      <li
                        onClick={() => handleSortChange("publish_date_newest")}
                      >
                        <a>Publish Date (Newest)</a>
                      </li>
                    </ul>
                  </div>

                  {/* View Mode */}
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-sm bg-white border border-gray-300 text-gray-700 w-full sm:w-auto"
                    >
                      View: {viewMode}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-3 z-50"
                    >
                      <li onClick={() => toggleViewMode("grid")}>
                        <a>Grid</a>
                      </li>
                      <li onClick={() => toggleViewMode("list")}>
                        <a>List</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <p className="text-lg text-gray-500 text-center">
                Loading results...
              </p>
            ) : searchResults.length > 0 ? (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "flex flex-col gap-4"
                } mx-auto w-[90%]`}
              >
                {searchResults
                  .slice(0, displayedBooks)
                  .map((book) =>
                    viewMode === "grid" ? (
                      <BrowsebookCard
                        key={book.id}
                        book={book}
                        bookDuplicate={bookDuplicate}
                      />
                    ) : (
                      <BrowsebookCardList
                        key={book.id}
                        book={book}
                        bookDuplicate={bookDuplicate}
                      />
                    )
                  )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-800 py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
                <p className="text-2xl font-medium mt-4">No Results</p>
                <p className="text-sm mt-2">
                  Please check your spelling or try searching with similar
                  categories. <br />
                  Please Try Again
                </p>
              </div>
            )}
            {searchResults.length > displayedBooks && (
              <button
                onClick={() => setDisplayedBooks((prev) => prev + 4)}
                className="text-red-500 mt-4 flex justify-center items-center mx-auto"
              >
                <span className="hover:underline underline-offset-2 ml-3 active:scale-95 transition duration-300">
                  More
                </span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewallBookPage;
