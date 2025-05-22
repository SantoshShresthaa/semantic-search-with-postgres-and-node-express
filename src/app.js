import express from 'express';
import { initializeDatabase } from './config/database.js';
import blogRoutes from './routes/blog.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Initialize database
initializeDatabase();

//routes
app.use('/blogs', blogRoutes);
export default app;