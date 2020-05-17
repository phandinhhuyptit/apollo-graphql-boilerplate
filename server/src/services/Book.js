import Book from "../models/Book";
import logger from "../utils/logger";
import loGet from "lodash/get";
import { LIST_BOOKS, NEW_BOOK  } from "../utils/constant";

export const getBooks = async (args) => {
  const { title, genre, name, status } = args;
  const objQuery = {};
  const resultPromise = await Promise.all([
    Book.find(objQuery)
      .populate("author")
      .sort([["createdAt", -1]]),
    Book.find(objQuery)
  ]);

  const books = resultPromise[0];

  // pubsub.publish(LIST_BOOKS, {
  //   listBooks: books
  // });

  const total = resultPromise[1] ? resultPromise[1].length : 0;
  return books;
};

export const getBook = async args => {
  const { bookId } = args;
  const book = await Book.findById(bookId).populate("author");
  return book;
};

export const addBook = async (args,pubsub) => {
  const bookObj = {
    title: loGet(args, ["title"]),
    name: loGet(args, ["name"]),
    genre: loGet(args, ["genre"]),
    author: loGet(args, ["authorId"])
  };
  
  const book = new Book(bookObj);
  const bookJson = book.toJSON()
  await pubsub.publish(NEW_BOOK,{
    autoAddBook : {...bookJson , id : bookJson._id}
  })
  await book.save();
  return book;
};

export const updateBook = async args => {
  const { bookId, title, genre, name, status } = args;
  const book = await Book.findById(bookId).exec();
  Object.assign(book, { title, genre, name, status });
  Object.keys(book).forEach(item => {
    if (book[item] === undefined || book[item] === null) delete author[item];
  });
  await book.save();
  return book;
};

export const deleteBook = async args => {
  const { bookId } = args;
  const checkIdExist = await Book.findById(bookId).exec();
  if (!checkIdExist) throw new ServerError("book is not exist in system", 400);
  await checkIdExist.remove();
  return {
    message: "Success"
  };
};
