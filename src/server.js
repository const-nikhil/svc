
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { Database } from "./libs";
import routes from "./router";
import { errorHandler, notFoundRoute } from "./middleware";

class Server {
    constructor(configuration) {
        this.app = express();
        this.configuration = configuration;
    }

    bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this.app;
    }

    setupRoutes() {
        const { app } = this;

        app.use('/health-check', (req, res) => {
            res.send('I am ok');
        });

        app.use('/api', cors(), routes);
        app.use(notFoundRoute);
        app.use(errorHandler);
    }

    initBodyParser() {
        const { app } = this;
        app.use(bodyParser.json());
    }

    run() {
        const { app, configuration: { port, mongourl } } = this;
        const successMessage = `| app is running on port ${port} |`;
        Database.open(mongourl)
            .then((resolve) => {
                resolve(
                    app.listen(port, err => {
                        if (err) {
                            const errorMessage = `error: app failed  ${err}`
                            console.log("~".repeat(errorMessage.length));
                            console.log(errorMessage);
                            console.log("~".repeat(errorMessage.length));
                        }
                        console.log("~".repeat(successMessage.length));
                        console.log(successMessage);
                        console.log("~".repeat(successMessage.length));
                    }))
            }).catch((err) => console.log(err))
        return this;
    }
}
export default Server;