import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Optional, if you want to include a favorite icon

function BrowsebookCardList({ book, bookDuplicate }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (book && bookDuplicate) {
      const availableCopies = bookDuplicate.filter(
        (duplicate) => duplicate.book_id === book.id && duplicate.status
      );
      setIsAvailable(availableCopies.length > 0);
    }
  }, [book, bookDuplicate]);

  return (
    <div className=" flex items-start p-4 bg-white  rounded-lg   ">
      {/* Book Cover Image */}
      <Link
        to={`/library/book/${book.title}`}
        state={{
          key: book.id,
          bookID: book.id,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          publishDate: book.publish_date,
          pageCount: book.no_of_page,
          coverImage: book.cover_image,
          description: book.description,
          status: book.status,
          isbn: book.isbn,
          edition: book.edition,
          category: book.category,
        }}
      >
        <div className=" flex-shrink-0 mr-4 hover:scale-105 transition duration-300 cursor-pointer">
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-[8rem] h-[12rem] object-cover shadow-lg"
          />
        </div>
      </Link>

      {/* Book Information */}
      <div className="flex-1">
        <Link
          to={`/library/book/${book.title}`}
          state={{
            key: book.id,
            bookID: book.id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publishDate: book.publish_date,
            pageCount: book.no_of_page,
            coverImage: book.cover_image,
            description: book.description,
            status: book.status,
            isbn: book.isbn,
            edition: book.edition,
            category: book.category,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800 hover:underline underline-offset-2 hover:translate-y-0.5 transition duration-300">
            {book.title}
          </h3>
        </Link>
        <p className="text-orange-500 mb-1 badge border border-orange-500 px-3">{book.category}</p>

        <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
        <p className="text-sm text-gray-600">
          Edition: {book.edition || "Unspecified"}
        </p>
        <p className="text-sm text-gray-600">
          Author: {book.author || "Unspecified"}
        </p>
        <p className="text-sm text-gray-600">
          Publisher: {book.publisher || "Unspecified"}
        </p>
        <p className="text-sm text-gray-600">
          Total Page: {book.no_of_page || "Unspecified"}
        </p>
      </div>

      {/* Availability and Favorite Icon */}
      <div className="flex flex-col items-end ml-4">
        <p
          className={`text-sm font-medium ${
            isAvailable ? "text-green-500" : "text-yellow-600"
          }`}
        >
          {isAvailable ? "Available" : "Not Available"}
        </p>
      </div>
    </div>
  );
}

export default BrowsebookCardList;
