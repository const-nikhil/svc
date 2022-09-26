import * as mongoose from 'mongoose';

import UserSchema from "./schema";

export const userSchema = new UserSchema({
    collection: 'user'
});

export const userModel = mongoose.model
    (
        'User',
        userSchema,
        'User',
        true
    );