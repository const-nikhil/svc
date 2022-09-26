import * as bcrypt from 'bcrypt';

import { userOperations, todoOperations } from "../repository";
import configuration from "../configuration";


export const userSeedData = () => {
    const repository = new userOperations();
    repository.count()
        .then((res) => {
            if (res === 0) {
                bcrypt.hash(configuration.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        repository.create({
                            firstName: "Nikhil",
                            lastName: "Rawat",
                            imageUrl: "http:image-url.in",
                            phoneNo: 9870114941,
                            email: "nikhil.rawat@gmail.com",
                            password: hash
                        });
                        repository.create({
                            firstName: "Akshay",
                            lastName: "Purohit",
                            imageUrl: "http:image-url.in",
                            phoneNo: 9899067141,
                            email: "askhay.purohit@gmail.com",
                            password: hash
                        });
                        repository.create({
                            firstName: "Tushar",
                            lastName: "Badola",
                            imageUrl: "http:image-url.in",
                            phoneNo: 9654576689,
                            email: "tushar.badola@gmail.com",
                            password: hash
                        });
                    }
                });
            }
        })
        .catch((err) => console.log(err));
};

export const todoSeedData = () => {
    const repository = new todoOperations();
    repository.count()
        .then((res) => {
            if (!res) {
                repository.create({
                    userId: "nikhil.rawat@gmail.com",
                    list: ["my first task", "my second task", "my third task"]
                });
                repository.create({
                    userId: "askhay.purohit@gmail.com",
                    list: ["my first task", "my second task", "my third task"]
                });
                repository.create({
                    userId: "tushar.badola@gmail.com",
                    list: ["my first task", "my second task", "my third task"]
                });

            }
        })
        .catch((err) => console.log(err));
};