import React, { useContext } from "react";
import loGet from "lodash/get";

const BookDetails = ({ book }) => {
  return (
    <li>
      <div className="title">{book.title}</div>
      <div className="author">{loGet(book, ["author", "name"])} </div>
      {/* <div className="author">{book.author}</div> */}
    </li>
  );
};

export default BookDetails;
