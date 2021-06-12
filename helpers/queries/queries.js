"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateOne = async (queryFields, target, targetValue) => await queryFields.schema.updateOne({ [queryFields.filterProperty]: queryFields.filterValue }, { [target]: targetValue });
const findOne = async (queryFields) => await queryFields.schema.findOne({
    [queryFields.filterProperty]: queryFields.filterValue,
});
const deleteEntries = async (queryFields, deleteAll = false) => deleteAll
    ? await queryFields.schema.deleteMany({
        [queryFields.filterProperty]: queryFields.filterValue,
    })
    : await queryFields.schema.deleteOne({
        [queryFields.filterProperty]: queryFields.filterValue,
    });
const findAll = async (schema, filters) => filters
    ? await schema.find({ [filters.filterProperty]: filters.filterValue })
    : await schema.find();
const create = async (schema, payload) => {
    const p = await schema.create({ ...payload });
    console.log(p);
    return p;
};
exports.default = {
    updateOne,
    findOne,
    deleteEntries,
    findAll,
    create,
};
