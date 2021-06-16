import { Model } from 'mongoose';

type QueryResult = Promise<object | void>;

interface Filters {
  filterProperty: string;
  filterValue: any;
}

interface QueryFields extends Filters {
  schema: Model<any>;
}

const updateOne = async (
  queryFields: QueryFields,
  target: string,
  targetValue: any
): QueryResult =>
  await queryFields.schema.updateOne(
    { [queryFields.filterProperty]: queryFields.filterValue },
    { [target]: targetValue }
  );

const findOne = async (queryFields: QueryFields): QueryResult =>
  await queryFields.schema.findOne({
    [queryFields.filterProperty]: queryFields.filterValue,
  });

const deleteEntries = async (
  queryFields: QueryFields,
  deleteAll: boolean = false
): QueryResult =>
  deleteAll
    ? await queryFields.schema.deleteMany({
        [queryFields.filterProperty]: queryFields.filterValue,
      })
    : await queryFields.schema.deleteOne({
        [queryFields.filterProperty]: queryFields.filterValue,
      });

const findAll = async (schema: Model<any>, filters?: Filters): QueryResult =>
  filters
    ? await schema.find({ [filters.filterProperty]: filters.filterValue })
    : await schema.find();

const create = async (schema: Model<any>, payload: object): QueryResult =>
  await schema.create({ ...payload });

export default {
  updateOne,
  findOne,
  deleteEntries,
  findAll,
  create,
};
