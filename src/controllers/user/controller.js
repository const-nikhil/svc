import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { userOperations } from "../../repository";
import configuration from "../../configuration";
import {
    LOGGED_IN,
    BAD_REQUEST,
    SERVER_BREAKDOWN,
    INCORRECT_USERNAME,
    SOMETHING_WENT_WRONG,
    USERNAME_ALREADY_EXIST,
    USER_FETCHED_SUCCESSFULLY
} from "../../constant";

class UserController {
    static instance;

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }
    async login(req, res, next) {
        try {
            console.log("inside login")
            const { secretkey } = configuration;
            const { body: { email, password } } = req;

            const repository = new userOperations();
            const docs = await repository.findOne({ email });
            if (docs === null) {
                next({
                    status: 400,
                    message: INCORRECT_USERNAME
                });
            }
            else {
                bcrypt.compare(password, docs.password, (error, result) => {
                    if (result) {
                        const { firstName, lastName, imageUrl, phoneNo, email } = docs
                        const token = jwt.sign({ firstName, lastName, imageUrl, phoneNo, email }, secretkey, {
                            expiresIn: '15d'
                        });
                        res.status(200).send({
                            status: 200,
                            message: LOGGED_IN,
                            data: token
                        });
                    }
                    else {
                        next({
                            status: 400,
                            message: BAD_REQUEST,
                        });
                    }
                });
            }
        }
        catch (err) {
            next({
                status: 503,
                message: SOMETHING_WENT_WRONG,
            });
        }
    }

    async signup(req, res, next) {
        try {
            const { salt } = configuration;
            const { body: { email, firstName, lastName, password, imageUrl = "", phoneNo = null } } = req

            const repository = new userOperations();

            const docs = await repository.findOne({ email });
            if (docs) {
                next({
                    status: 400,
                    message: USERNAME_ALREADY_EXIST
                });
            }
            else {
                const hash = await bcrypt.hash(password, JSON.parse(salt));
                const docs = await repository.create({
                    email,
                    firstName,
                    lastName,
                    imageUrl,
                    password: hash,
                    phoneNo
                });

                if (docs) {
                    const { firstName, lastName } = docs;
                    res.status(200).send({
                        status: 200,
                        message: `${firstName} ${lastName} created successfully`,
                    });
                }
                else {
                    next({
                        status: 400,
                        message: SOMETHING_WENT_WRONG
                    });
                }
            }
        }
        catch (err) {
            next({
                status: 503,
                message: SERVER_BREAKDOWN,
            });
        }
    }

    profile(req, res, next) {
        try {
            const { headers: { authorization: token } } = req;
            const { secretkey } = configuration;

            const decoded = jwt.decode(token, secretkey);

            res.status(200).send({
                status: 200,
                message: USER_FETCHED_SUCCESSFULLY,
                data: decoded
            });
        } catch (err) {
            next({
                status: 401,
                message: SERVER_BREAKDOWN
            })
        }
    }
}

export default UserController.getInstance();