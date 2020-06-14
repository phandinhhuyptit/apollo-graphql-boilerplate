import React, { useContext, forwardRef, useImperativeHandle } from "react";
import loGet from "lodash/get";

const BookDetails = forwardRef(({ book, handleDeleteBook }, ref) => {
  const testBook = () => {
    console.log("Hello ref");
  };

  useImperativeHandle(ref, () => ({
    testBook() {
      testBook();
    }
  }));
  return (
    <li>
      <div
        className="title"
        onClick={() => handleDeleteBook(loGet(book, ["id"]))}
      >
        {book.title}
      </div>
      <div className="author">{loGet(book, ["author", "name"],"")} </div>
    </li>
  );
});

export default BookDetails;
