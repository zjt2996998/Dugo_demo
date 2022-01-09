import { Book, IBook } from "../models/book.model";

export class BookController {
  public async getAll(): Promise<IBook[]> {
    const book = await Book.find({});
    return book;
  }
  public async createBook(book: IBook): Promise<IBook> {
    const data = Book.build(book);
    await data.save();
    return book;
  }
  public async getById(id: string) {
    const book = await Book.findOne({ _id: id }).lean();
    return book;
  }
  public async update(id: string, body: object) {
    const book = await Book.findOneAndUpdate({ _id: id }, body).lean();
    return book;
  }
  public async deleteById(id: string) {
    const book = await Book.deleteOne({ _id: id }).lean();
    return book;
  }

}
