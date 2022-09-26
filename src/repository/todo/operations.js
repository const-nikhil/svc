import * as mongoose from 'mongoose';

import { todoModel } from "./model";
import versioningOperations from "../versioning/operations";


export default class todoOperations extends versioningOperations {
    constructor() {
        super(todoModel);
    }
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    count() {
        return todoModel.countDocuments();
    }
    totalCount() {
        const finalQuery = { deletedAt: undefined };
        return todoModel.countDocuments(finalQuery);
    }
}