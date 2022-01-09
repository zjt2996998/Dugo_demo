import mongoose, { Schema, Document, Model } from "mongoose";

import { IAuthor, Author } from "./author.model";

interface IBook {
  title: string;
  description: string;
  ISBN: string;
  author: IAuthor;
}

interface BookModelInterface extends mongoose.Model<BookDoc> {
  build(attr: IBook): BookDoc;
}

interface BookDoc extends mongoose.Document {
  title: string;
  description: string;
  ISBN: string;
  author: IAuthor;
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ISBN: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
});

bookSchema.statics.build = (attr: IBook) => {
  return new Book(attr);
};

const Book = mongoose.model<BookDoc, BookModelInterface>("Book", bookSchema);

export { Book, IBook };
