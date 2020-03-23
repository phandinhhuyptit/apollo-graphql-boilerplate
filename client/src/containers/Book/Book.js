import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import BookList from "../../components/BookList";
import NewBookForm from "../../components/NewBookForm";
import BookContextProvider from "../../contexts/BookContext";

const Book = props => {
  return (
    <>
      <BookContextProvider>
        <Navbar />
        <BookList />
        <NewBookForm />
      </BookContextProvider>
    </>
  );
};

Book.propTypes = {};

export default Book;
