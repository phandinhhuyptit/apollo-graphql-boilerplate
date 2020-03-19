import Author from "../models/Author";
import logger from "../utils/logger";
import ServerError from "../utils/serverError";

export const getAuthors = async args => {
  const { name, age } = args;
  const objQuery = {};
  const resultPromise = await Promise.all([
    Author.find(objQuery)
      .populate("books")
      .sort([["createdAt", -1]]),
    Author.find(objQuery)
  ]);

  const authors = resultPromise[0];
  const total = resultPromise[1] ? resultPromise[1].length : 0;
  return authors;
};

export const getAuthor = async args => {
  const { authorId } = args;
  const author = await Author.findById(authorId).populate("books");
  return author;
};

export const addAuthor = async args => {
  const author = new Author(Object.assign({}, args));
  await author.save();
  return author;
};

export const updateAuthor = async args => {
  const { authorId, name, age } = args;
  const author = await Author.findById(authorId).exec();
  Object.assign(author, { name, age });
  Object.keys(author).forEach(item => {
    if (author[item] === undefined || author[item] === null)
      delete author[item];
  });
  await author.save();
  return author;
};

export const deleteAuthor = async args => {
  const { authorId } = args;
  const checkIdExist = await Author.findById(authorId).exec();
  if (!checkIdExist) throw new ServerError("book is not exist in system", 400);
  await checkIdExist.remove();
};
