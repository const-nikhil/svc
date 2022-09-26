import * as mongoose from 'mongoose';

import { userModel } from "./model";
import versioningOperations from "../versioning/operations";


export default class userOperations extends versioningOperations {
    constructor() {
        super(userModel);
    }
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    count() {
        return userModel.countDocuments();
    }
    totalCount() {
        const finalQuery = { deletedAt: undefined };
        return userModel.countDocuments(finalQuery);
    }
}