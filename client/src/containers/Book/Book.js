import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import BookList from "../../components/BookList";
import NewBookForm from "../../components/NewBookForm";

const Book = props => {
  return (
    <>
      <Navbar />
      <BookList />
      <NewBookForm />
    </>
  );
};

Book.propTypes = {};

export default Book;
