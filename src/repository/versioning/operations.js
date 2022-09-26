import * as mongoose from 'mongoose';

export default class versioningOperations {
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const id = versioningOperations.generateObjectId();
        const model = new this.model({
            ...data,
            _id: id,
            originalId: id,
        });
        return await model.save();
    }
    count(query) {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.countDocuments(finalQuery);
    }
    getAll(query, projection = {}, options = {}, sortBy, sortOrder) {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery).sort({ [sortBy]: sortOrder }).skip(projection).limit(options);
    }
    findOne(query, options = {}) {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.findOne(finalQuery, options);
    }
    find(query = {}, projection = {}, options = {}) {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery, projection, options);
    }

    invalidate(id, name) {
        const query = { originalId: id, deletedAt: { $exists: false }, deletedBy: { $exists: false } };
        const data = { deletedAt: Date.now(), deletedBy: name };
        return this.model.update(query, data);
    }
    async delete(id, name) {
        const prevoius = await this.findOne({ originalId: id, deletedAt: undefined });
        if (prevoius) {
            return await this.invalidate(id, name);
        }
    }
    async update(data) {
        const previous = await this.findOne({
            originalId: data.originalId,
            deletedAt: { $exists: false }
        });
        if (previous) {
            await this.invalidate(data.originalId, data.updatedBy);
        }
        else {
            return undefined;
        }

        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data);
        newData._id = versioningOperations.generateObjectId();
        delete newData.deletedAt;
        newData.updatedAt = Date.now();
        const model = new this.model(newData);
        return await model.save();
    }
}