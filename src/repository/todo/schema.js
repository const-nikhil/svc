import baseSchema from "../versioning/schema";

export default class TodoSchema extends baseSchema {
    constructor(collections) {
        const schema = Object.assign( {
            _id: String,
            userId: String,
            list: [],
        });
        super(schema, collections);
    }
};
