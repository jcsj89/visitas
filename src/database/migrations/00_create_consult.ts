import Knex = require('knex');

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('consult', table => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()'));
        table.string('cpf').nullable();
        table.integer('quantidade').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('consult');
}
