import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { BookController } from "../controllers/book.controller";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         ISBN:
 *           type: string
 *           required: true
 *         author:
 *           $ref: "#/components/schemas/Author"
 *       required:
 *         - title
 *         - ISBN
 *         - author
 */

/**
 * @openapi
 * /book/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: UUID of the book to retrieve.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Retrieve a single JSONPlaceholder book.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: "#/components/schemas/Book"
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *    tags:
 *     - Book
 */
 router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const controller = new BookController();
    const userID = req.params.id || '';
    const response = await controller.getById(userID);
    return res.json({ statusCode: 200, data: { ...response } });
  } catch (err) {
    return next(err);
  }
});

/**
 * @openapi
 * /book:
 *  get:
 *    responses:
 *      200:
 *        description: A list of Books.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Book"
 *      400:
 *        description: Bad Request
 *    tags:
 *     - Book
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const controller = new BookController();
    const response = await controller.getAll();
    return res.json({ statusCode: 200, data: { ...response } });
  } catch (err) {
    return next(err);
  }
});

/**
 * @openapi
 * /book:
 *  post:
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Book'
 *   responses:
 *    201:
 *     description: Created
 *    400:
 *     description: Bad Request
 *   tags:
 *    - Book
 */
router.post(
  "/",
  body("title").isLength({ min: 5 }),
  body("author.age").isInt(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const controller = new BookController();
      const response = await controller.createBook(req.body);
      return res.status(201).json({ statusCode: 201, data: { ...response } });
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * @openapi
 * /book/{id}:
 *   patch:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Update the book.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ISBN:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *     tags:
 *       - Book
 */
 router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const controller = new BookController();
    const userID = req.params.id || '';
    const response = await controller.update(userID, req.body);
    return res.json({ statusCode: 200, data: { ...response } });
  } catch (err) {
    return next(err);
  }
});

/**
 * @openapi
 * /book/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: UUID of the book to retrieve.
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: No Content
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *    tags:
 *     - Book
 */
 router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const controller = new BookController();
    const userID = req.params.id || '';
    const response = await controller.deleteById(userID);
    return res.status(204).json({ statusCode: 204, data: { ...response } });
  } catch (err) {
    return next(err);
  }
});

export default router;
