import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  Application,
} from "express";

import morgan from "morgan";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import connectDB from "./config/database";

import Router from "./routes";

const PORT = process.env.NODE_PORT || 8000;

const app: Application = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Dugo",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(Router);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: any,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  const status = err.status || 500;
  return res.status(status).json({ 
    message: err.message,
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server is running on port", PORT);
});
