import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function BookCard({
  bookID,
  title,
  author,
  coverImage,
  description,
  publisher,
  publishDate,
  pageCount,
  status,
  isbn,
  edition,
  category,
}) {
  // Truncate description and author for consistent display
  const truncatedDescription =
    description.length > 150
      ? `${description.substring(0, 147)}...`
      : description;
  const truncatedAuthor =
    author.length > 20 ? `${author.substring(0, 17)}...` : author;

  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl m-6">
        <figure className="overflow-hidden w-full lg:w-1/3 flex items-center justify-center">
          <img
            src={coverImage}
            alt="Album"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body w-full lg:w-2/3 text-center lg:text-left">
          <h2 className="card-title font-semibold text-2xl">{title}</h2>
          <h3 className="text-xl text-orange-600">
            #{category}
            <span className="ml-3 ">BookNo. {bookID}</span>
          </h3>
          <p className="font-light text-xl">{truncatedDescription}</p>

          <div className="card-actions flex flex-col lg:flex-row justify-center lg:justify-between mt-auto items-center gap-4">
            <h1 className="font-medium text-xl text-neutral-600">
              {truncatedAuthor}
            </h1>
            <Link
              to={`/library/book/${title}`}
              state={{
                bookID,
                title,
                author,
                coverImage,
                description,
                publisher,
                publishDate,
                pageCount,
                status,
                isbn,
                edition,
                category,
              }}
              className="btn btn-primary bg-orange-500 px-11 border-none rounded-full text-white hover:bg-orange-700"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
