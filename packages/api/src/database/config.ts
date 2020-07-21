import * as Knex from "knex";
import { Model } from "objection";

export default () => {
  const knexConnection = Knex(
    require(process.env.KNEXFILE || "../../knexfile")
  );
  Model.knex(knexConnection);
};

const aggregatorDatabase = Knex(
  // tslint:disable-next-line: no-var-requires
  require(process.env.KNEXFILE_AGGREGATOR || "../../knexfile-aggregator")
);

export { aggregatorDatabase };
