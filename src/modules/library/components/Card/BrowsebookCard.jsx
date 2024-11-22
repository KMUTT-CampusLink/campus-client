import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BrowsebookCard({ book, bookDuplicate }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (book && bookDuplicate) {
      // Filter duplicates where book_id matches and status is true
      const availableCopies = bookDuplicate.filter(
        (duplicate) => duplicate.book_id === book.id && duplicate.status
      );
      setIsAvailable(availableCopies.length > 0);
    }
  }, [book, bookDuplicate]);

  return (
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
      <div className="w-[13rem] p-4 bg-white hover:-translate-y-1 hover:scale-105 duration-300">
        {/* Book Image */}
        <div className="relative ">
          <div className="w-full h-[16rem] flex items-center justify-center rounded-md">
            <img
              src={book.cover_image}
              alt="Campus Library"
              className="w-[75%] h-[80%] shadow-2xl"
            />
          </div>
        </div>

        {/* Book Information */}
        <div className="flex flex-col mt-4">
          <div
            className={`flex items-center font-semibold mb-1 ${
              isAvailable ? "text-green-500" : "text-yellow-600"
            }`}
          >
            <div
              className={`rounded-full p-1 mr-2 ${
                isAvailable ? "bg-green-500" : "bg-yellow-600"
              }`}
            ></div>
            {isAvailable ? "Available" : "Not Available"}
          </div>
          <h3 className="text-base font-semibold mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-sm text-gray-500">{book.publisher}</p>
        </div>
      </div>
    </Link>
  );
}

export default BrowsebookCard;
