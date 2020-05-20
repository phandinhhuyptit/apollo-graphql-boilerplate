import React, { useContext, useState, useRef, useEffect } from "react";
import BookDetails from "../BookDetail";
import { BookContext } from "../../contexts/BookContext";
import { StoreContext } from "../../contexts/StoreContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import loGet from "lodash/get";
import { GET_BOOKS, DELETE_BOOK, SUBSCRIPTIONS_ADD_BOOK, SUBSCRIPTIONS_REMOVE_BOOK } from "../../graphql/Book/Book";
import { Button } from "react-bootstrap";
import { BookListWrapper } from "./BookList.styled";
import { toast } from "react-toastify";
import { OPEN_MODAL } from "../../utils/constants/book/book";

 
const BookList = () => {
  const { state, dispatch } = useContext(BookContext);
  const [
    deleteBook,
    { loadingAddBook: mutationLoading, errorAddBook: mutationError }
  ] = useMutation(DELETE_BOOK);
  const { subscribeToMore,loading, error, data } = useQuery(GET_BOOKS);
  const books = loGet(data, ["books"], []);
  const [isModal, setIsModal] = useState(false);
  const [listData, setListData] = useState([]);
  const BookDetailRef = useRef();


  useEffect(()=>{
   if(books && books.length > 0) {    
    setListData(books)
   }             
  },[books])


  useEffect(()=> {
    subscribeToMore({
        document : SUBSCRIPTIONS_ADD_BOOK,
        fetchPolicy: "no-cache",
        updateQuery: (prev, { subscriptionData }) => {
           if(!subscriptionData.data) return prev
              return Object.assign({}, prev, {
                books: [subscriptionData.data.autoAddBook,...loGet(prev,["books"])]
              });
      }
    })  
    console.log(listData)  
  })

  useEffect(()=> {
    subscribeToMore({
      document : SUBSCRIPTIONS_REMOVE_BOOK,
      fetchPolicy: "no-cache",
      updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData.data) return prev
            const id = subscriptionData.data.autoRemoveBook.id
            // const newListData = loGet(prev,["books"]).filter(book => book.id !== id )
            test()
            // setListData(newListData)
      }
    })  
  })


  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const handleDeleteBook = async id => {
    try {
      const result = await deleteBook({
        variables: { bookId: id },
        refetchQueries: () => ["GET_BOOKS"]
      });
      toast.success("Success!", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (errors) {
      toast.warn(`${loGet(errors, [0, "message"])}`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return books.length > 0 ? (
    <BookListWrapper>
      <div className="book-list">
        <ul>
          {books.map(book => {
            return (
              <BookDetails
                handleDeleteBook={handleDeleteBook}
                ref={BookDetailRef}
                book={book}
                key={book.id}
              />
            );
          })}
        </ul>
        <div className="button-wrapper">
          <Button onClick={() => openModal()} variant="primary">
            {" "}
            Add Book{" "}
          </Button>
          <Button
            className="ml-1"
            variant="primary"
            onClick={() => {
              BookDetailRef.current.testBook();
            }}
          >
            {" "}
            Test{" "}
          </Button>
        </div>
      </div>
    </BookListWrapper>
  ) : (
    <>
      <div className="empty">No books to read. Hello free time :).</div>
      <div className="button-wrapper">
        <Button onClick={() => openModal()} variant="primary">
          {" "}
          Add Book{" "}
        </Button>
        <Button
          className="ml-1"
          variant="primary"
          onClick={() => {
            BookDetailRef.current.testBook();
          }}
        >
          {" "}
          Test{" "}
        </Button>
      </div>
    </>
  );
};

export default BookList;
