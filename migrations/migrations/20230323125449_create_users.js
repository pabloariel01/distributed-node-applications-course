
module.exports.up = async function(knex) {
    await knex.schema.createTable('users',(table)=>{
        table.increments('id').unsigned().primary()
        table.string('username', 24).unique().notNullable();
    })

    await knex('users').insert([{username:'tlhunter'},{username:'steve'}])
  
};

module.exports.down = function(knex) {
  knex.schema.dropTable('users')
};
