import React, { useContext, useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BOOK } from "../../graphql/Book/Book";
import { StoreContext } from "../../contexts/StoreContext";
import loGet from "lodash/get";
import { BookFormWrapper, Button } from "./NewBookForm.styled";
// import { BookContext } from "../../contexts/BookContext";

const NewBookForm = () => {
  const { state } = useContext(StoreContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");

  const titleRef = useRef(null);
  const genreRef = useRef(null);
  const nameRef = useRef(null);
  // const authorRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch({ type: "ADD_BOOK", book: { title, author } });
    setTitle("");
    setAuthor("");
  };

  return (
    <BookFormWrapper theme={loGet(state, ["theme"])}>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="book title"
          ref={titleRef}
          value={title}
          onChange={e => setTitle(titleRef.current.value)}
          required
        />
        <input
          type="text"
          ref={nameRef}
          placeholder="book name"
          value={name}
          onChange={e => setAuthor(nameRef.current.value)}
          required
        />
        <input
          type="text"
          ref={genreRef}
          placeholder="book genre"
          value={genre}
          onChange={e => setAuthor(genreRef.current.value)}
          required
        />
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </div>
    </BookFormWrapper>
  );
};

export default NewBookForm;
