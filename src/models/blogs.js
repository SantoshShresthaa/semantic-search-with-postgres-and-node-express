import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class Blog extends Model {}

// pgvector(sequelize);
// Define a minimal custom VECTOR type for pgvector
DataTypes.VECTOR = function VECTOR() {
  return {
    type: 'VECTOR',
    toSql() {
      return 'VECTOR(1024)'; // Match existing column definition
    },
    _stringify(value) {
      // Convert array to pgvector format: '[0.1,0.2,...]'
      if (Array.isArray(value)) {
        return `[${value.join(',')}]`;
      }
      return value;
    },
    parse(value) {
      // Parse pgvector string to array: '[0.1,0.2,...]' -> [0.1, 0.2, ...]
      if (typeof value === 'string') {
        return value.replace(/^\[|\]$/g, '').split(',').map(Number);
      }
      return value;
    }
  };
};
DataTypes.VECTOR.key = 'VECTOR';

Blog.init(
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    embedding: {
      type: DataTypes.VECTOR, // using pgvector
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs', // your table is named "Blogs"
    timestamps: true, // createdAt & updatedAt
  }
);

export default Blog;