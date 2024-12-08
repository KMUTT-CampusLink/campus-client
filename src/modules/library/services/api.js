import { axiosInstance } from "../../../utils/axiosInstance";

// Function to get announcements
export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get("/library/announce");
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return null;
  }
};

// Function to get categories
export const getCategory = async () => {
  try {
    const response = await axiosInstance.get("/library/category");
    return response.data.map((category) => category.title); // Return processed data (only titles)
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

// Function to get book data
export const getData = async () => {
  try {
    const response = await axiosInstance.get("/library/book");
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Function to get book duplicates
export const getDuplicate = async () => {
  try {
    const response = await axiosInstance.get("/library/bookDupe");
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching book duplicates:", error);
    return null;
  }
};

// Function to fetch events
export const fetchEvents = async () => {
  try {
    const response = await axiosInstance.get("/library/event");
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
};

// Function to fetch books
export const fetchBooks = async () => {
  try {
    const response = await axiosInstance.get("/library/book");
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};

// Function to fetch and process announcements
export const fetchAnnouncements = async () => {
  try {
    const response = await axiosInstance.get("/library/announce");
    const announcements = response.data;

    const sorted = announcements
      .map((announcement) => {
        const updatedDate = new Date(announcement.updated_at);
        const currentDate = new Date();
        const daysDifference = Math.ceil(
          (currentDate - updatedDate) / (1000 * 60 * 60 * 24)
        );

        return {
          ...announcement,
          isNew: daysDifference <= 7,
        };
      })
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    return sorted; // Return sorted announcements
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return null;
  }
};

// Function to fetch reserved books
export const fetchReservedBook = async () => {
  try {
    const response = await axiosInstance.get("/library/allDupe");
    return response.data; // Return the reserved books data
  } catch (error) {
    console.error("Error fetching ReservedBook:", error);
    return null; // Return null in case of an error
  }
};

// Function to return a book
export const returnBook = async (reservationId, duplicateId) => {
  const returnedBookData = {
    status: "Returned",
    reservation_id: reservationId,
    duplicateId: duplicateId,
  };

  try {
    const response = await axiosInstance.post(
      "/library/returnBook",
      returnedBookData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error returning the book:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Function to make a reservation
export const makeReservation = async (reservationData) => {
  try {
    const response = await axiosInstance.post(
      "/library/reservations",
      reservationData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error during reservation:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
