"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("superheroes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      realName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "real_name",
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      originDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "origin_description",
      },
      catchPhrase: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "catch_phrase",
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("superheroes");
  },
};
