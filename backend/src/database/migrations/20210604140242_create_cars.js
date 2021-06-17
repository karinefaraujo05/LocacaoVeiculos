
exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table){
    table.increments();
    table.string('model').notNullable();
    table.decimal('year',4).notNullable();
    table.string('description').notNullable();
    table.string('city').notNullable();
    table.decimal('value').notNullable();
    //table.string('chassi').notNullable();
    //table.let('bill_id').notNullable();
    //table.string('situation').notNullable();
    //table.string('situation O/F').notNullable();

    table.string('location_id').notNullable();
    //table.string('document_id').notNullable();
    //table.string('maintenance_id').notNullable();
    

    table.foreign('location_id').references('id').inTable('location');
    //table.foreign('document_id').references('id').inTable('document');
    //table.foreign('bill_id').references('id').inTable('bill');
    //table.foreign('maintenance_id').references('id').inTable('maintenence');
    
});
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};


