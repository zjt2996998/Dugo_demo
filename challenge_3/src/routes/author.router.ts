import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { AutherController } from "../controllers/author.controller";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Author:
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         age:
 *           type: integer
 *           required: true
 */

/**
 * @openapi
 * /author:
 *  get:
 *    responses:
 *      200:
 *        description: A list of Authors.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Author"
 *      400:
 *        description: Bad Request
 *    tags:
 *     - Author
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const controller = new AutherController();
    const response = await controller.getAll();
    return res.json({ statusCode: 200, data: { ...response } });
  } catch (err) {
    return next(err);
  }
});


/**
 * @openapi
 * /author:
 *  post:
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Author'
 *   responses:
 *    201:
 *     description: Created
 *    400:
 *     description: Bad Request
 *   tags:
 *    - Author
 */
router.post(
  "/",
  body("age").isInt(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const controller = new AutherController();
      const response = await controller.createAuthor(req.body);
      return res.status(201).json({ statusCode: 201, data: { ...response } });
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
