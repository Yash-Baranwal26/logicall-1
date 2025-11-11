import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import entryRoutes from './src/routes/entries.js';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

const app= express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
app.use(cors())
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/entries', entryRoutes);

// Health check endpoint
app.get('/health', (req,res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req,res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/health`);
});

export default app;