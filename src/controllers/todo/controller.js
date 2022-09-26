import { todoOperations } from "../../repository";
import configuration from "../../configuration";

class TodoController {
    static instance;

    static getInstance() {
        if (TodoController.instance) {
            return TodoController.instance;
        }
        TodoController.instance = new TodoController();
        return TodoController.instance;
    }

    async addItem(req, res, next) {
        try {
            const { query } = req

            console.log(query);
        }
        catch (err) {
            next({
                status: 503,
                message: "SERVER BREAKDOWN",
            });
        }
    }
}

export default TodoController.getInstance();