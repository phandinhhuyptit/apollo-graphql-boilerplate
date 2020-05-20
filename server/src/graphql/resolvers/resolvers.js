import {
  addBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook
} from "../../services/Book";
import {
  addAuthor,
  getAuthor,
  getAuthors,
  updateAuthor
} from "../../services/Author";
import { LIST_BOOKS , NEW_BOOK ,REMOVE_BOOK } from "../../utils/constant";

export default {
  Query: {
    books: (_, args) => getBooks({ ...args }),
    book: (_, args) => getBook({ ...args }),
    authors: (_, args) => getAuthors({ ...args }),
    author: (_, args) => getAuthor({ ...args })
  },
  Mutation: {
    addBook: (_, args,{ pubsub }) => addBook({ ...args },pubsub),
    addAuthor: (_, args) => addAuthor({ ...args }),
    updateAuthor: (_, args) => updateAuthor({ ...args }),
    updateBook: (_, args) => updateBook({ ...args }),
    deleteBook: (_, args,{ pubsub }) => deleteBook({ ...args },pubsub)
  },
  Subscription: {
    autoAddBook: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_BOOK)
    },
    autoRemoveBook: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(REMOVE_BOOK)
    }
  }
};
