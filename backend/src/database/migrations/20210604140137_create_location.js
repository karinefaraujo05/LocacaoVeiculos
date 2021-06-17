exports.up = function(knex) {
  return knex.schema.createTable('location', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('model').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    //table.string('seller_id').notNullable();
    //table.string('client_id').notNullable();

    //table.foreign('seller_id').references('id').inTable('seller');
    //table.foreign('client_id').references('id').inTable('client');

   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('location');
};
