import Author from "../models/Author";
import logger from "../utils/logger";

export const getAuthors = async args => {
  try {
    const { name, age } = args;
    const objQuery = {};
    const resultPromise = await Promise.all([
      Author.find(objQuery)
        .populate("books")
        .sort([["createdAt", -1]]),
      Author.find(objQuery)
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

export const getAuthor = async args => {
  try {
    const { authorId } = args;
    const author = await Author.findById(authorId).populate("books");
    return res.status(200).json({
      message: "Success",
      author
    });
  } catch (error) {
    logger.error(err);
    return res.status(err.code || 500).json({ message: err.message });
  }
};

export const addAuthor = async args => {
  try {
    const author = new Author({}, args);
    await author.save();
    return res.status(200).json({
      message: "Success",
      book
    });
  } catch (error) {
    logger.error(err);
    return res.status(err.code || 500).json({ message: err.message });
  }
};

export const updateAuthor = async args => {
  try {
    const { authorId, title, genre, name, status } = args;
    const book = await Author.findById(authorId).exec();
    Object.assign(book, { name, age });
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
