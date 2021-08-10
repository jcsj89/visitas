import Knex = require('knex');

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary();
        table.string('email').nullable();
        table.string('password_hash').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
