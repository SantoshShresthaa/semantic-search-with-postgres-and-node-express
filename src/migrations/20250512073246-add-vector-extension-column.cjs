'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Enable the vector extension
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS vector;');
    
    // Add the embedding column with proper vector type
    await queryInterface.sequelize.query(`
      ALTER TABLE blogs 
      ADD COLUMN IF NOT EXISTS embedding vector(1024);
    `);

    // Create an index for faster similarity searches
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS blogs_embedding_idx ON blogs 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS blogs_embedding_idx;');
    
    // Remove the embedding column
    await queryInterface.sequelize.query('ALTER TABLE blogs DROP COLUMN IF EXISTS embedding;');
    
    // Disable the vector extension
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS vector;');
  }
};
