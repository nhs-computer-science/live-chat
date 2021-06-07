import { Model } from 'mongoose';

type QueryResult = Promise<object | void>;

interface OptionalQueryFields {
  targetValue?: any;
  target?: string;
  fetchAll?: boolean;
  deleteAll?: boolean;
}

interface QueryFields extends OptionalQueryFields {
  schema: Model<any>;
  filterProperty: string;
  filterValue: any;
}

const updateOne = async (queryFields: QueryFields): QueryResult =>
  await queryFields.schema.updateOne(
    { [queryFields.filterProperty]: queryFields.filterValue },
    { [queryFields.target!]: queryFields.targetValue }
  );

const fetchEntries = async (queryFields: QueryFields): QueryResult =>
  queryFields.fetchAll
    ? await queryFields.schema.find({})
    : await queryFields.schema.findOne({
        [queryFields.filterProperty]: queryFields.filterValue,
      });

const deleteEntries = async (queryFields: QueryFields): QueryResult =>
  queryFields.deleteAll
    ? await queryFields.schema.deleteMany({
        [queryFields.filterProperty]: queryFields.filterValue,
      })
    : await queryFields.schema.deleteOne({
        [queryFields.filterProperty]: queryFields.filterValue,
      });

const create = async (schema: Model<any>, payload: object): QueryResult =>
  await schema.create({ ...payload });

export default {
  updateOne,
  fetchEntries,
  deleteEntries,
  create,
};
