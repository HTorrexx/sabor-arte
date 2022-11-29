import express from "express";
import fileUpload from "express-fileupload";
import { createRoles } from "./libs/initialSetup.js";
import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from './routes/user.routes.js'
import cors from 'cors'

const app = express();
createRoles();
app.use(cors())

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
  );

app.use(productsRouter);
app.use(authRouter);
app.use(userRouter);

export default app;
