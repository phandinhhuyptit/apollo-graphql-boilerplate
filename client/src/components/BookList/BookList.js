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

  const [isModal, setIsModal] = useState(false);
  const [listData, setListData] = useState([]);
  const BookDetailRef = useRef();

  useEffect(()=>{
   if(data && data.books.length > 0) {    
    setListData(data.books)
   }             
  },[data])


  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIPTIONS_ADD_BOOK,
      fetchPolicy: "no-cache",
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        if (
          loGet(prev, ["books"], []).some(
            (book) => book.id === subscriptionData.data.autoAddBook.id
          )
        ) {
          return prev;
        }
        const books = [
          subscriptionData.data.autoAddBook,
          ...loGet(prev, ["books"]),
        ];
        return {
          books: books,
        };
      },
    });
  });

  useEffect(()=> {
    subscribeToMore({
      document : SUBSCRIPTIONS_REMOVE_BOOK,
      fetchPolicy: "no-cache",
      updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData.data) return prev
            const id = subscriptionData.data.autoRemoveBook.id
            if(loGet(prev, ["books"], []).some(
              (book) => book.id === subscriptionData.data.autoRemoveBook.id
            )){
              const books =  loGet(prev, ["books"], []).filter(book => book.id !== subscriptionData.data.autoRemoveBook.id) 
              return {
                books: books,
              };
            }
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
  return listData.length > 0 ? (
    <BookListWrapper>
      <div className="book-list">
        <ul>
          {listData.map(book => {
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
