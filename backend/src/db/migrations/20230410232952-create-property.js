"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
    -- auto-generated definition
create table if not exists property
(
    address     varchar(250),
    city        varchar(64),
    price       numeric,
    description text,
    year        integer,
    id          integer not null
        constraint id
            primary key
);

alter table property
    owner to isrhdnag;


    `);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
