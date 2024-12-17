import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import BrowsebookCard from "../components/Card/BrowsebookCard";
import BrowsebookCardList from "../components/Card/BrowsebookCardList";
import { getCategory, getData, getDuplicate } from "../services/api";

function BookSearchPage() {
  const { keyword } = useParams();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [displayedAuthors, setDisplayedAuthors] = useState(7);
  const [displayedYears, setDisplayedYears] = useState(7);
  const [sortCriteria, setSortCriteria] = useState("relevant");
  const [isAuthorsExpanded, setIsAuthorsExpanded] = useState(false);
  const [isYearsExpanded, setIsYearsExpanded] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [displayedBooks, setDisplayedBooks] = useState(12);

  const [viewMode, setViewMode] = useState("grid");
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Fetch all book data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await getData(); 
        if (response) {
          setData(response);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);
  // Fetch duplicate data for availability
  useEffect(() => {
    const fetchDuplicateData = async () => {
      try {
        const response = await getDuplicate(); // Use the getDuplicate() function from api.js
        if (response) {
          setBookDuplicate(response);
        }
      } catch (error) {
        console.error("Error fetching book duplicates:", error);
      }
    };
    fetchDuplicateData();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory(); // Use the getCategory() function from api.js
        if (response) {
          setCategories(response);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Filter and sort books based on the keyword, filters, and sorting criteria
  useEffect(() => {
    if (data.length > 0 && keyword) {
      let filteredBooks = data.filter(
        (book) =>
          book.title.toLowerCase().includes(keyword.toLowerCase()) ||
          book.author.toLowerCase().includes(keyword.toLowerCase())
      );

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
            return 0; // No sorting for "relevant"
        }
      });

      setSearchResults(filteredBooks);
    }
  }, [
    data,
    keyword,
    selectedAuthors,
    selectedYears,
    selectedCategories,
    sortCriteria,
  ]);

  // Derive filter options from `searchResults`
  const authorCounts = {};
  const yearCounts = {};
  const categoryCounts = {};

  searchResults.forEach((book) => {
    // Author counts
    if (book.author) {
      authorCounts[book.author] = authorCounts[book.author]
        ? authorCounts[book.author] + 1
        : 1;
    }

    // Publish year counts
    const year = new Date(book.publish_date).getFullYear();
    if (!isNaN(year)) {
      yearCounts[year] = yearCounts[year] ? yearCounts[year] + 1 : 1;
    }

    // Category counts
    if (book.category) {
      categoryCounts[book.category] = categoryCounts[book.category]
        ? categoryCounts[book.category] + 1
        : 1;
    }
  });

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle author click
  const handleAuthorClick = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  // Handle year click
  const handleYearClick = (year) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedAuthors([]);
    setSelectedYears([]);
    setSelectedCategories([]);
  };

  // Show more authors
  const showMoreAuthors = () => {
    setDisplayedAuthors((prev) => prev + 7);
  };

  // Show more years
  const showMoreYears = () => {
    setDisplayedYears((prev) => prev + 7);
  };

  // Show more books
  const showMoreBooks = () => {
    setDisplayedBooks((prev) => prev + 4);
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(true);
  const [isYearsOpen, setIsYearsOpen] = useState(true);

  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleAuthors = () => setIsAuthorsOpen(!isAuthorsOpen);
  const toggleYears = () => setIsYearsOpen(!isYearsOpen);

  return (
    <div className="min-w-[850px]">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10 ">
        <MainNavbar />

        <div className=" container mx-auto p-6 flex flex-col md:flex-row-reverse gap-6 ">
          {/* Filters Container */}
          <div className="w-full md:w-1/4 p-4 bg-white rounded-lg  min-w-[500px] md:min-w-[300px]">
            {/* Filter Header */}
            <div className="flex justify-between items-center mb-4  p-4 ">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-orange-500 hover:underline underline-offset-2"
              >
                Clear Filters
              </button>
            </div>

            {/* Selected Filters Tags */}
            <div className="flex flex-wrap gap-2 mb-4 px-4">
              {selectedAuthors.map((author) => (
                <span
                  key={author}
                  className="badge badge-outline border-orange-500 text-orange-500 p-3"
                >
                  {author}
                  <button
                    onClick={() => handleAuthorClick(author)}
                    className="ml-1 text-orange-500 hover:text-orange-800"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedYears.map((year) => (
                <span
                  key={year}
                  className="badge badge-outline border-orange-500 text-orange-500 p-3"
                >
                  {year}
                  <button
                    onClick={() => handleYearClick(year)}
                    className="ml-1 text-orange-500 hover:text-orange-800"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="badge badge-outline border-orange-500 text-orange-500 p-3"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="ml-1 text-orange-500 hover:text-orange-800"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {/* Category Filter */}
            <div className="mb-3">
              <div
                className={`border-none collapse collapse-arrow border border-base-300 bg-base-100 rounded-box ${
                  isCategoriesOpen ? "collapse-open" : ""
                }`}
              >
                <div
                  className="collapse-title font-semibold"
                  onClick={toggleCategories}
                >
                  Categories
                </div>
                <div className="collapse-content">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <p
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`cursor-pointer mb-2 ${
                        selectedCategories.includes(category)
                          ? "text-orange-500 underline"
                          : "hover:underline hover:text-orange-500"
                      }`}
                    >
                      {category} ({count})
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Authors Filter */}
            <div className="mb-3">
              <div
                className={`collapse collapse-arrow border-none bg-base-100 rounded-box ${
                  isAuthorsOpen ? "collapse-open" : ""
                }`}
              >
                <div
                  className="collapse-title font-semibold"
                  onClick={toggleAuthors}
                >
                  Authors
                </div>
                <div className="collapse-content">
                  {Object.entries(authorCounts)
                    .slice(0, displayedAuthors)
                    .map(([author, count]) => (
                      <p
                        key={author}
                        onClick={() => handleAuthorClick(author)}
                        className={`cursor-pointer mb-2 ${
                          selectedAuthors.includes(author)
                            ? "text-orange-500 underline"
                            : "hover:underline hover:text-orange-500"
                        }`}
                      >
                        {author} ({count})
                      </p>
                    ))}
                  {Object.keys(authorCounts).length > displayedAuthors && (
                    <button
                      onClick={() => setDisplayedAuthors((prev) => prev + 7)}
                      className="text-sm active:scale-95 transition duration-100 text-red-500 mt-4 hover:underline underline-offset-2 flex justify-center mx-auto "
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Year Filter */}
            <div className="mb-3">
              <div
                className={`collapse collapse-arrow border-none bg-base-100 rounded-box ${
                  isYearsOpen ? "collapse-open" : ""
                }`}
              >
                <div
                  className="collapse-title font-semibold"
                  onClick={toggleYears}
                >
                  Publish Year
                </div>
                <div className="collapse-content">
                  {Object.entries(yearCounts)
                    .slice(0, displayedYears)
                    .map(([year, count]) => (
                      <p
                        key={year}
                        onClick={() => handleYearClick(year)}
                        className={`cursor-pointer mb-2 ${
                          selectedYears.includes(year)
                            ? "text-orange-500 underline"
                            : "hover:underline hover:text-orange-500"
                        }`}
                      >
                        {year} ({count})
                      </p>
                    ))}
                  {Object.keys(yearCounts).length > displayedYears && (
                    <button
                      onClick={() => setDisplayedYears((prev) => prev + 7)}
                      className="text-sm active:scale-95 transition duration-100 text-red-500 mt-4 hover:underline underline-offset-2 flex justify-center mx-auto"
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Search Results Container */}
          <div className="w-[33rem] md:w-3/4 mx-auto rounded-lg bg-white   ">
            <div className="flex mx-auto w-[90%] flex-col ">
              <h1 className="text-3xl font-medium mt-6 mb-3  text-center md:text-left">
                All results for 'KEYWORD: {keyword}'
              </h1>
              {/* Sorting */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-3 space-y-3 sm:space-y-0 sm:space-x-4">
                <p className="text-neutral-500 font-light">
                  Found: {searchResults.length} titles
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto ">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <p className="text-neutral-500 font-light">Sort By</p>
                    <div className="dropdown dropdown-end w-full sm:w-auto z-50">
                      <label
                        tabIndex={0}
                        className="btn btn-sm font-normal rounded-lg flex justify-between space-x-1 bg-white border border-gray-300 text-neutral-700 hover:bg-white w-full sm:w-[13rem]"
                      >
                        {/* Display selected sort option */}
                        {sortCriteria === "relevant" && "Relevant"}
                        {sortCriteria === "alphabetical" && "Alphabetically"}
                        {sortCriteria === "upload_date" && "Upload Date"}
                        {sortCriteria === "publish_date_oldest" &&
                          "Publish Date (Oldest)"}
                        {sortCriteria === "publish_date_newest" &&
                          "Publish Date (Newest)"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 mt-3 z-50"
                      >
                        <li onClick={() => setSortCriteria("relevant")}>
                          <a
                            className={
                              sortCriteria === "relevant"
                                ? "text-orange-500 font-semibold"
                                : ""
                            }
                          >
                            Relevant
                          </a>
                        </li>
                        <li onClick={() => setSortCriteria("alphabetical")}>
                          <a
                            className={
                              sortCriteria === "alphabetical"
                                ? "text-orange-500 font-semibold"
                                : ""
                            }
                          >
                            Alphabetically
                          </a>
                        </li>
                        <li onClick={() => setSortCriteria("upload_date")}>
                          <a
                            className={
                              sortCriteria === "upload_date"
                                ? "text-orange-500 font-semibold"
                                : ""
                            }
                          >
                            Upload Date
                          </a>
                        </li>
                        <li
                          onClick={() => setSortCriteria("publish_date_oldest")}
                        >
                          <a
                            className={
                              sortCriteria === "publish_date_oldest"
                                ? "text-orange-500 font-semibold"
                                : ""
                            }
                          >
                            Publish Date (Oldest)
                          </a>
                        </li>
                        <li
                          onClick={() => setSortCriteria("publish_date_newest")}
                        >
                          <a
                            className={
                              sortCriteria === "publish_date_newest"
                                ? "text-orange-500 font-semibold"
                                : ""
                            }
                          >
                            Publish Date (Newest)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <p className="text-neutral-500 font-light">View Mode</p>
                    <div className="dropdown dropdown-end z-50">
                      <label
                        tabIndex={0}
                        className="btn btn-sm rounded-lg flex items-center space-x-1 bg-white hover:bg-white w-full sm:w-auto"
                      >
                        {viewMode === "list" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5 3a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2h-3zM13 11a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3z" />
                          </svg>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-3"
                      >
                        <li className="menu-title">
                          <span>View Mode</span>
                        </li>
                        <li onClick={() => setViewMode("list")}>
                          <a className="flex items-center">
                            {viewMode === "list" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-orange-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 7.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <span
                              className={`${
                                viewMode === "list" ? "text-orange-500" : ""
                              }`}
                            >
                              List
                            </span>
                          </a>
                        </li>
                        <li onClick={() => setViewMode("grid")}>
                          <a className="flex items-center">
                            {viewMode === "grid" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-orange-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 7.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <span
                              className={`${
                                viewMode === "grid" ? "text-orange-500" : ""
                              }`}
                            >
                              Grid
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
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
                    ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3"
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
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
                <p className="text-2xl font-medium mt-4">No Results</p>
                <p className="text-sm mt-2">
                  Please check your spelling or try searching with similar
                  keywords. <br />
                  Please Try Again
                </p>
              </div>
            )}
            {searchResults.length > displayedBooks && (
              <button
                onClick={showMoreBooks}
                className="text-red-500 mt-4  flex justify-center items-center mx-auto"
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

export default BookSearchPage;
