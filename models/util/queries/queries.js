"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateOne = async (queryFields) => await queryFields.schema.updateOne({ [queryFields.filterProperty]: queryFields.filterValue }, { [queryFields.target]: queryFields.targetValue });
const fetchEntries = async (queryFields) => queryFields.fetchAll
    ? await queryFields.schema.find({})
    : await queryFields.schema.findOne({
        [queryFields.filterProperty]: queryFields.filterValue,
    });
const deleteEntries = async (queryFields) => queryFields.deleteAll
    ? await queryFields.schema.deleteMany({
        [queryFields.filterProperty]: queryFields.filterValue,
    })
    : await queryFields.schema.deleteOne({
        [queryFields.filterProperty]: queryFields.filterValue,
    });
const create = async (schema, payload) => await schema.create({ ...payload });
exports.default = {
    updateOne,
    fetchEntries,
    deleteEntries,
    create,
};
