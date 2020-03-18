import Book from "../models/Book";
import logger from "../utils/logger";
import loGet from "lodash/get";

export const getBooks = async args => {
  try {
    const { title, genre, name, status } = args;
    const objQuery = {};
    const resultPromise = await Promise.all([
      Book.find(objQuery)
        .populate("books")
        .sort([["createdAt", -1]]),
      Book.find(objQuery)
    ]);

    const books = resultPromise[0];
    const total = resultPromise[1] ? resultPromise[1].length : 0;

    return res.status(200).json({
      message: "Success",
      books,
      total
    });
  } catch (error) {
    logger.error(err);
    return res.status(err.code || 500).json({ message: err.message });
  }
};

export const getBook = async args => {
  try {
    const { bookId } = args;
    const book = await Book.findById(bookId).populate("author");
    return res.status(200).json({
      message: "Success",
      book
    });
  } catch (error) {
    logger.error(err);
    return res.status(err.code || 500).json({ message: err.message });
  }
};

export const addBook = async args => {
  try {
    const book = new Book({}, args);
    await book.save();
    return res.status(200).json({
      message: "Success",
      book
    });
  } catch (error) {
    logger.error(err);
    return res.status(err.code || 500).json({ message: err.message });
  }
};

export const updateBook = async args => {
  try {
    const { bookId, title, genre, name, status } = args;
    const book = await Book.findById(bookId).exec();
    Object.assign(book, { title, genre, name, status });
    Object.keys(book).forEach(item => {
      if (book[item] === undefined || book[item] === null) delete author[item];
    });
    await book.save();
    return book;
  } catch (error) {
    logger.error(err);
    return res.status(err.code || 500).json({ message: err.message });
  }
};
