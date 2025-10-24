const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');

// Import your route handlers
const deadlinesRouter = require('../server/deadlines');
const careerPathwaysRouter = require('../server/careerPathways');
const collegesRouter = require('../server/colleges');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PathfinderAI API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/deadlines', deadlinesRouter);
app.use('/api/career-pathways', careerPathwaysRouter);
app.use('/api/colleges', collegesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);