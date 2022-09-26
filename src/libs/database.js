import * as mongoose from 'mongoose';

import { todoSeedData, userSeedData } from "./seedData";

const seedData = () => {
    todoSeedData();
    userSeedData();
}

class Database {
    static open(mongourl) {
        return new Promise((resolve, reject) => {
            mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                seedData();
                resolve(() => {
                    const message = "| Database connected |";
                    console.log("~".repeat(message.length));
                    console.log(message);
                    console.log("~".repeat(message.length));

                });
            });
        });
    }
    static disconnect() {
        console.log("Database disconnected");
    }
}

export default Database;