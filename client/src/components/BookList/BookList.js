import React, { useContext } from "react";
import BookDetails from "../BookDetail";
import { BookContext } from "../../contexts/BookContext";
import { StoreContext } from "../../contexts/StoreContext";
import { useQuery } from "@apollo/react-hooks";
import loGet from "lodash/get";
import { GET_BOOKS } from "../../graphql/Book/Book";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const books = loGet(data, ["books"], []);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return books.length ? (
    <div className="book-list">
      <ul>
        {books.map(book => {
          return <BookDetails book={book} key={book.id} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No books to read. Hello free time :).</div>
  );
};

export default BookList;
