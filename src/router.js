import { Router } from "express";
import { userRouter, todoRouter } from "./controllers";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/todo", todoRouter);

export default mainRouter;