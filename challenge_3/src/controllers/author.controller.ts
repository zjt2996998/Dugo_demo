import { Author, IAuthor } from "../models/author.model";

export class AutherController {
  public async getAll(): Promise<IAuthor[]> {
    const author = await Author.find({});
    return author;
  }
  public async createAuthor(author: IAuthor): Promise<IAuthor> {
    const data = Author.build(author);
    await data.save();
    return author;
  }
}
