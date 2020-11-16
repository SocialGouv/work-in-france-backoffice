import * as Knex from "knex";
import { join } from "path";
import { Model } from "objection";

export default () => {
  const config = process.env.KNEXFILE
    ? // tslint:disable-next-line: no-var-requires
      require(process.env.KNEXFILE)
    : // tslint:disable-next-line: no-var-requires
      require(join(__dirname, "..", "..", "knexfile"));
  const knexConnection = Knex(config);
  Model.knex(knexConnection);
};

const aggregatorDatabase = Knex(
  process.env.KNEXFILE_AGGREGATOR
    ? // tslint:disable-next-line: no-var-requires
      require(process.env.KNEXFILE_AGGREGATOR)
    : // tslint:disable-next-line: no-var-requires
      require(join(__dirname, "..", "..", "knexfile"))
);

export { aggregatorDatabase };
