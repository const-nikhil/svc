import * as mongoose from 'mongoose';

export default class baseSchema extends mongoose.Schema {
    constructor(options, collections) {
        const option = Object.assign( {
            createdAt: {
                default: Date.now,
                type: Date
            },
            deletedAt: {
                required: false,
                type: Date
            },
            updatedAt: {
                requied: false,
                type: Date
            },
            originalId: {
                required: true,
                type: String
            }
        }, options);
        super(option, collections);
    }
}