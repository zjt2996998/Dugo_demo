import mongoose from "mongoose";

interface IAuthor {
  name: string;
  age: number;
}

interface authorModelInterface extends mongoose.Model<AuthorDoc> {
  build(attr: IAuthor): AuthorDoc;
}

interface AuthorDoc extends mongoose.Document {
  name: string;
  age: number;
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

authorSchema.statics.build = (attr: IAuthor) => {
  return new Author(attr);
};

const Author = mongoose.model<AuthorDoc, authorModelInterface>(
  "Author",
  authorSchema
);

export { Author, IAuthor };
