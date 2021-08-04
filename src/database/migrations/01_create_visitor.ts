import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('visitors', table => {
        table.string('VIS_OBS', 2550).nullable().alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('visitors');
}
