/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return (
    knex.schema
      .createTable('users', (table) => {
        table.increments('id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('phone', 255).notNullable();
        table.string('email', 255).notNullable();
        table.integer('upload_id').notNullable();
        table.timestamps(true, true);
      })
      .createTable('uploads', (table) => {
        table.increments('id');
        table.integer('number_of_entries').notNullable();
        table.timestamps(true, true);
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('uploads');
};
