import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
function RequestPage() {
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
    totalCopies,
    category,
  } = location.state || {};

  const [todayDate, setTodayDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const [selectedDuplicateID, setSelectedDuplicateID] = useState(null); // To store the matched book_duplicate ID

  const getDuplicate = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/library/bookDupe`
      );
      setBookDuplicate(response.data);

      // Find the matching book_duplicate entry based on bookID and status === true
      const matchingBook = response.data.find(
        (book) => book.book_id === bookID && book.status === true
      );
      if (matchingBook) {
        setSelectedDuplicateID(matchingBook.id);
      }
    } catch (error) {
      console.error("Error fetching book duplicate:", error);
    }
  };

  useEffect(() => {
    getDuplicate();
  }, [bookID]);

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
    setTodayDate(formattedToday);

    const returnDay = new Date();
    returnDay.setDate(today.getDate() + 7);
    const formattedReturnDate = returnDay.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
    setReturnDate(formattedReturnDate);
  }, []);

  const userID1 = "9ea13823-6a05-4d2f-8116-26345d8d7047";
  const userID2 = "51ab7267-4ae5-4065-804d-60ff0935b182";

  const handleReservation = async () => {
    if (!selectedDuplicateID) {
      console.error("No matching book duplicate found or status is not true.");
      return;
    }

    const reservationData = {
      status: "Reserved",
      user_id: "9ea13823-6a05-4d2f-8116-26345d8d7047",
      book_duplicate_id: selectedDuplicateID,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/library/reservations`,
        reservationData
      );
      console.log("Reservation successful:", response.data);
    } catch (error) {
      console.error("Error during reservation:", error);
    }
  };

  if (!location.state) {
    return (
      <p className="text-center text-lg text-red-500">
        No book selected for request.
      </p>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className=" pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        {/* Code here */}
        <div className="bg-neutral-100 min-h-screen p-8 min-w-[530px]">
          <div className="container bg-white shadow-lg rounded-lg p-6 mx-auto flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="bg-neutral-700 rounded-lg overflow-hidden flex-shrink-0 w-full lg:w-1/3">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 lg:mt-0 flex-1">
              <h1 className="text-3xl font-semibold mb-4">
                Request for:{" "}
                <span className="font-normal text-gray-700">{title}</span>
              </h1>
              <p className="text-xl mb-4">
                <span className="font-semibold">Type:</span>{" "}
                <span className="text-gray-700">{category}</span>
              </p>
              <p className="text-xl mb-4">
                <span className="font-semibold">Author:</span>{" "}
                <span className="text-gray-700">{author}</span>
              </p>
              <p className="text-xl mb-4">
                <span className="font-semibold">Available Copies:</span>{" "}
                <span className="text-gray-700">{totalCopies}</span>
              </p>
              <hr className="my-4" />
              <h2 className="text-2xl mb-3">
                Hello,{" "}
                <span className="text-orange-600 font-bold">User-Name</span>
              </h2>
              <p className="text-lg mb-2">
                Reserve will be:{" "}
                <span className="text-green-600"> {todayDate} </span>
              </p>
              <p className="text-lg">
                Please return by:{" "}
                <span className="text-red-600"> {returnDate} </span>
              </p>
              <Link to={"/library/myBook"}>
                <button
                  className="btn btn-primary bg-orange-500 px-11 border-none rounded-full text-white hover:bg-orange-700 mt-6"
                  onClick={handleReservation}
                >
                  Confirm Reservation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RequestPage;
