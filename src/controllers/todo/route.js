import { Router } from "express";

import TodoController from "./controller";

const todoRouter = Router();
todoRouter.route("/addItem")
    .post(TodoController.addItem);

export default todoRouter;