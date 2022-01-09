import express from "express";
import AuthorRouter from "./author.router";
import BookRouter from "./book.router";

const router = express.Router();

router.use("/author", AuthorRouter);
router.use("/book", BookRouter);

export default router;