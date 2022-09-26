import baseSchema from "../versioning/schema";

export default class UserSchema extends baseSchema {
    constructor(collections) {
        const schema = Object.assign( {
            _id: String,
            firstName: String,
            lastName: String,
            imageUrl: String,
            phoneNo: Number,
            email: String,
            password: String
        });
        super(schema, collections);
    }
};
