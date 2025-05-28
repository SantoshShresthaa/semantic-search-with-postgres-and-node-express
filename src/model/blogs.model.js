import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  },
  embedding: {
    type: DataTypes.VECTOR(1536),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'blogs'
});

// Find similar blogs with cosine similarity threshold
Blog.findSimilarWithThreshold = async function(embedding, threshold = 0.7, limit = 5) {
  return sequelize.query(`
    SELECT id, title, content, author, 
           1 - (embedding <=> $1) as similarity
    FROM blogs
    WHERE embedding IS NOT NULL
    AND 1 - (embedding <=> $1) > $2
    ORDER BY similarity DESC
    LIMIT $3
  `, {
    replacements: [embedding, threshold, limit],
    type: sequelize.QueryTypes.SELECT
  });
};

// Find similar blogs with L2 distance threshold
Blog.findSimilarWithL2Threshold = async function(embedding, threshold = 0.3, limit = 5) {
  return sequelize.query(`
    SELECT id, title, content, author, 
           embedding <-> $1 as distance
    FROM blogs
    WHERE embedding IS NOT NULL
    AND embedding <-> $1 < $2
    ORDER BY distance ASC
    LIMIT $3
  `, {
    replacements: [embedding, threshold, limit],
    type: sequelize.QueryTypes.SELECT
  });
};

// Find similar blogs with inner product threshold
Blog.findSimilarWithInnerProduct = async function(embedding, threshold = 0.5, limit = 5) {
  return sequelize.query(`
    SELECT id, title, content, author, 
           embedding <#> $1 as similarity
    FROM blogs
    WHERE embedding IS NOT NULL
    AND embedding <#> $1 > $2
    ORDER BY similarity DESC
    LIMIT $3
  `, {
    replacements: [embedding, threshold, limit],
    type: sequelize.QueryTypes.SELECT
  });
};

export default Blog; 