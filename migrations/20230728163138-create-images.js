"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("images", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      superheroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "superhero_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "superheroes",
          key: "id",
        },
      },
      imagePath: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "image_path",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("images");
  },
};
