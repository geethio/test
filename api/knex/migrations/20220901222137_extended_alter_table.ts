import { Knex } from "knex";
import { Monster } from "../../src/models";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(Monster.tableName, (table: Knex.TableBuilder) => {
    table.string('name').notNullable();    
  });
}


export async function down(knex: Knex): Promise<void> {
}
