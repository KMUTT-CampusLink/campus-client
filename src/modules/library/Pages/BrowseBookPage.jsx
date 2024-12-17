import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import BrowsebookCard from "../components/Card/BrowsebookCard";
import { getData, getDuplicate } from "../services/api";

function BrowseBookPage() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState({
    booknames: [],
    authors: [],
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const booksPerPage = 9;

  const navigate = useNavigate(); // Use navigate hook

  // Fetch categories
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axiosInstance.get("/library/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);

  // Fetch book data
  const fetchBookData = async () => {
    try {
      const data = await getData(); // Use the getData function from api.js
      setData(data);
      setFilteredBooks(data); // Set filtered books to full book list initially
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  // Fetch duplicate data
  const fetchDuplicateData = async () => {
    try {
      const duplicates = await getDuplicate(); // Use the getDuplicate function from api.js
      setBookDuplicate(duplicates);
    } catch (error) {
      console.error("Error fetching book duplicates:", error);
    }
  };

  useEffect(() => {
    fetchDuplicateData();
  }, []);

  // Handle view all click for category
  const handleViewAllClick = (category) => {
    navigate(`/library/viewall/${category.title}`);
  };

  // Handle search term changes to update suggestions only
  useEffect(() => {
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();

      const booknameSuggestions = data.filter((book) =>
        book.title.toLowerCase().startsWith(lowercaseSearchTerm)
      );

      const authorSuggestions = data.filter((book) =>
        book.author.toLowerCase().startsWith(lowercaseSearchTerm)
      );

      setSuggestions({
        booknames: booknameSuggestions,
        authors: authorSuggestions,
      });

      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [data, searchTerm]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title || suggestion.author);
    setShowSuggestions(false);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/library/search/${searchTerm}`);
    }
  };

  return (
    <div className="min-w-[850px]">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10 font-nunito">
        <MainNavbar />
        {/* SearchBar */}
        <div className="bg-neutral-100 flex flex-col items-center justify-center h-[20rem] px-4 min-w-[850px]">
          <h1 className="text-4xl font-semibold py-6 text-center">
            Browse Your Book
          </h1>
          <div className="relative w-full sm:w-[30rem]">
            <div className="flex items-center shadow-lg rounded-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Search for Bookname or Author..."
                className="input w-full px-4 py-2 focus:outline-none text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-orange-500 p-3 text-white flex items-center justify-center w-[4rem]"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.79 3.707l4.387 4.386a1 1 0 01-1.414 1.414l-4.386-4.387A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {showSuggestions && (
              <div className="absolute top-full mt-1 w-full bg-white shadow-md rounded-b-lg z-10">
                {suggestions.booknames.length > 0 && (
                  <div>
                    {suggestions.booknames.slice(0, 5).map((suggestion) => (
                      <div
                        key={`bookname-${suggestion.id}`}
                        className="p-2 hover:bg-orange-500 hover:text-white cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.title}
                      </div>
                    ))}
                  </div>
                )}
                {suggestions.authors.length > 0 && (
                  <div>
                    {suggestions.authors.slice(0, 5).map((suggestion) => (
                      <div
                        key={`author-${suggestion.id}`}
                        className="p-2 hover:bg-orange-500 hover:text-white cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.author}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-5 p-6 text-sm text-neutral-700">
            {/* <a
              href="#"
              className="hover:underline underline-offset-2 decoration-orange-500"
            >
              Advanced Search
            </a>
            <a
              href="#"
              className="hover:underline underline-offset-2 decoration-orange-500"
            >
              Alphabetical Search
            </a> */}
          </div>
        </div>

        {/* New Arrivals Container */}
        <div className="container mx-auto p-6 flex items-center flex-col">
          <h1 className="text-3xl font-medium mt-6 mb-3 text-center">
            New Arrivals
          </h1>
          <p className="text-neutral-500 font-light text-center">
            Check out our newly released books now!
          </p>

          {/* Book Container */}
          <div className="container mx-auto p-6 flex flex-col gap-6 items-center rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 md:scale-90">
              {data
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5)
                .map((book) => (
                  <BrowsebookCard
                    key={book.id}
                    book={book}
                    bookDuplicate={bookDuplicate}
                  />
                ))}
            </div>

            <button
              className="btn bg-white hover:outline-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded-full border p-2 px-6 border-orange-600 text-orange-600 mt-4"
              onClick={() => handleViewAllClick({ title: "New Arrivals" })}
            >
              View All
            </button>
          </div>
          <hr className="w-[60%] mx-auto my-6" />

          {/* Category Container */}
          {categories.map((category) => (
            <div
              key={category.id}
              className="container mx-auto p-6 flex items-center flex-col"
            >
              <h1 className="text-3xl font-medium mt-6 mb-3 text-center">
                {category.title}
              </h1>
              <p className="text-neutral-500 font-light text-center">
                {category.description}
              </p>

              {/* Book Container for Selected Category */}
              <div className="container mx-auto p-6 flex flex-col gap-6 items-center rounded-2xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {filteredBooks
                    .filter((book) => book.category === category.title)
                    .slice(0, 5)
                    .map((book) => (
                      <BrowsebookCard
                        key={book.id}
                        book={book}
                        bookDuplicate={bookDuplicate}
                      />
                    ))}
                </div>

                <button
                  className="btn bg-white hover:outline-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded-full border p-2 px-6 border-orange-600 text-orange-600 mt-4"
                  onClick={() => handleViewAllClick(category)}
                >
                  View All
                </button>
              </div>
              <hr className="w-[60%] mx-auto my-6" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BrowseBookPage;
