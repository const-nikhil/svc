import * as mongoose from 'mongoose';

import TodoSchema from "./schema";

export const todoSchema = new TodoSchema({
    collection: 'user'
});

export const todoModel = mongoose.model
    (
        'Todo',
        todoSchema,
        'Todo',
        true
    );