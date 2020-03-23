import React, { useContext, useState } from "react";
import BookDetails from "../BookDetail";
import { BookContext } from "../../contexts/BookContext";
import { StoreContext } from "../../contexts/StoreContext";
import { useQuery } from "@apollo/react-hooks";
import loGet from "lodash/get";
import { GET_BOOKS } from "../../graphql/Book/Book";
import { Button } from "react-bootstrap";
import { BookListWrapper } from "./BookList.styled";
import { OPEN_MODAL } from "../../utils/constants/book/book";

const BookList = () => {
  const { state, dispatch } = useContext(BookContext);
  const [isModal, setIsModal] = useState(false);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const books = loGet(data, ["books"], []);

  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return books.length ? (
    <BookListWrapper>
      <div className="book-list">
        <ul>
          {books.map(book => {
            return <BookDetails book={book} key={book.id} />;
          })}
        </ul>
        <div className="button-wrapper">
          <Button onClick={() => openModal()} variant="primary">
            {" "}
            Add Book{" "}
          </Button>
          <div> {JSON.stringify(state.isModal)} </div>
        </div>
      </div>
    </BookListWrapper>
  ) : (
    <div className="empty">No books to read. Hello free time :).</div>
  );
};

export default BookList;
