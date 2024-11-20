import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import BookCard from "../components/Card/BookCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function BookListPage() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 10]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const booksPerPage = 9;

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/library/category"
        );
        setCategories(response.data.map((category) => category.title));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/library/book"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Update filteredBooks based on fetched data
    let filtered = data;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedCategories.some((category) => book.category === category)
      );
    }

    if (searchTerm) {
      // Check if the search term starts with '#' for ID search
      if (searchTerm.startsWith("#")) {
        const bookId = searchTerm.slice(1); // Remove the '#' and get the book ID
        filtered = filtered.filter((book) => book.id.toString() === bookId);
      } else {
        filtered = filtered.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page when filters change

    // Update suggestions based on search term
    if (searchTerm) {
      const newSuggestions = data.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [data, selectedCategories, searchTerm]);

  // Ensure the current page is not out of bounds
  useEffect(() => {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredBooks, currentPage, booksPerPage]);

  // Update page range when currentPage changes
  useEffect(() => {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage >= pageRange[1] && currentPage < totalPages) {
      setPageRange([currentPage - 2, currentPage + 7]);
    } else if (currentPage <= pageRange[0] && currentPage > 1) {
      setPageRange([currentPage - 1, currentPage + 8]);
    }
  }, [currentPage, filteredBooks.length, booksPerPage, pageRange]);

  // Calculate the books to display on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle category filter change
  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="bg-neutral-100 min-w-[530px]">
          <div className="container mx-auto p-6 flex">
            <div className="categories w-[30%] p-3">
              <h1 className="font-semibold text-3xl mb-3 ">Categories</h1>
              <div className="bg-white p-3 rounded-lg shadow-xl">
                {categories.map((category) => (
                  <div key={category} className="flex items-center p-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary border-orange-500 hover:border-red-600"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) =>
                        handleCategoryChange(category, e.target.checked)
                      }
                    />
                    <span className="label-text ml-3 text-lg">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="container pt-3 flex flex-col">
              <h1 className="font-semibold text-3xl mb-3">Book List</h1>
              <p className="pb-3 text-orange-600 text-xl">
                Found: <span className="font-semibold">{filteredBooks.length}</span> Book Title
              </p>

              <div className="form-control container pb-3 relative">
                <input
                  type="text"
                  placeholder="Search (Bookname, Author or #ID)"
                  className="input w-full md:w-auto rounded-2xl shadow-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-xl z-10 mt-1">
                    {suggestions.slice(0, 5).map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.title} by {suggestion.author}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-xl ">
                {currentBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    bookID={book.id}
                    title={book.title}
                    author={book.author}
                    publisher={book.publisher}
                    publishDate={book.publish_date}
                    pageCount={book.no_of_page}
                    coverImage={book.cover_image}
                    description={book.description}
                    status={book.status}
                    isbn={book.isbn}
                    edition={book.edition}
                    category={book.category}
                  />
                ))}
              </div>
              <div className="join flex justify-center mt-4">
                <button
                  className="join-item btn btn-lg"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
                <button
                  className="join-item btn btn-lg"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lsaquo;
                </button>
                {Array.from(
                  { length: Math.min(10, totalPages) },
                  (_, index) => {
                    const pageNumber = pageRange[0] + index;
                    if (pageNumber > totalPages) return null;
                    return (
                      <button
                        key={pageNumber}
                        className={`join-item btn btn-lg ${
                          currentPage === pageNumber ? "btn-active" : ""
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}
                <button
                  className="join-item btn btn-lg"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &rsaquo;
                </button>
                <button
                  className="join-item btn btn-lg"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookListPage;
