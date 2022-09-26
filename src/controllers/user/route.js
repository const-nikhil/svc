import { Router } from "express";

import UserController from "./controller";

const userRouter = Router();
userRouter.route("/login")
    .post(UserController.login);
userRouter.route("/profile")
    .get(UserController.profile);
userRouter.route("/signup")
    .post(UserController.signup)

export default userRouter;