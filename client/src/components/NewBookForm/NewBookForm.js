import React, { useContext, useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BOOK } from "../../graphql/Book/Book";
import { StoreContext } from "../../contexts/StoreContext";
import loGet from "lodash/get";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../Spinner";
import { BookFormWrapper, ButtonSubmit, MyForm } from "./NewBookForm.styled";
import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORS } from "../../graphql/Author/Author";
// import { BookContext } from "../../contexts/BookContext";

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must have at least 2 characters")
    .max(100, "Name can't be longer than 100 characters")
    .required("name is required"),
  title: Yup.string()
    .min(2, "Title must have at least 2 characters")
    .max(30, "Title can't be longer than 30 characters")
    .required("title is required"),
  genre: Yup.string().required("genre is required"),

  author: Yup.string().required("author is required")
});

const NewBookForm = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const authors = loGet(data, ["authors"]);
  const { state } = useContext(StoreContext);
  const [title, setTitle] = useState("");
  const [authorId, setAuthor] = useState("");
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
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Add Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          Spinner
        ) : (
          <Formik
            initialValues={{ title: "", name: "", genre: "", author: "" }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              handleReset
            }) => {
              return (
                <BookFormWrapper>
                  <MyForm className="mx-auto">
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title :</Form.Label>
                      <Form.Control
                        className={
                          touched.title && errors.title ? "error" : null
                        }
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      {touched.title && errors.title ? (
                        <div className="error-message">{errors.title}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group controlId="formName">
                      <Form.Label>Name :</Form.Label>
                      <Form.Control
                        className={touched.name && errors.name ? "error" : null}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {touched.name && errors.name ? (
                        <div className="error-message">{errors.name}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                      <Form.Label>Genre :</Form.Label>
                      <Form.Control
                        className={
                          touched.genre && errors.genre ? "error" : null
                        }
                        as="select"
                        size="md"
                        custom
                        name="genre"
                        placeholder="Genre"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.genre}
                      >
                        <option value="" selected disabled hidden>
                          Choose here
                        </option>
                        <option value="drama">Drama</option>
                        <option value="fiction"> Fiction</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="horror">Horror</option>
                      </Form.Control>
                      {touched.genre && errors.genre ? (
                        <div className="error-message">{errors.genre}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                      <Form.Label>Author :</Form.Label>
                      <Form.Control
                        className={
                          touched.author && errors.author ? "error" : null
                        }
                        as="select"
                        size="md"
                        custom
                        name="author"
                        placeholder="Select author"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.author}
                      >
                        <option value="" selected disabled hidden>
                          Choose author
                        </option>
                        {authors.map(author => (
                          <option value={author.id}>{author.name}</option>
                        ))}
                      </Form.Control>

                      {touched.author && errors.author ? (
                        <div className="error-message">{errors.author}</div>
                      ) : null}
                    </Form.Group>
                    <ButtonSubmit
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </ButtonSubmit>
                  </MyForm>
                </BookFormWrapper>
              );
            }}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default NewBookForm;
