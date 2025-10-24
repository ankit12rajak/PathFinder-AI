const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    routes: ['/api/deadlines', '/api/career-pathways', '/api/colleges']
  });
});

// Load routes
console.log('📦 Loading API routes...');

try {
  const deadlinesRouter = require('./deadlines');
  app.use('/api/deadlines', deadlinesRouter);
  console.log('✅ Loaded /api/deadlines');
} catch (e) {
  console.error('❌ Failed to load deadlines:', e.message);
}

try {
  const careerPathwaysRouter = require('./careerPathways');
  app.use('/api/career-pathways', careerPathwaysRouter);
  console.log('✅ Loaded /api/career-pathways');
} catch (e) {
  console.error('❌ Failed to load career-pathways:', e.message);
}

try {
  const collegesRouter = require('./colleges');
  app.use('/api/colleges', collegesRouter);
  console.log('✅ Loaded /api/colleges');
} catch (e) {
  console.error('❌ Failed to load colleges:', e.message);
}

// 404 handler
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ 
    error: 'Not Found', 
    path: req.url,
    availableRoutes: ['/health', '/api/deadlines', '/api/career-pathways', '/api/colleges']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`\n📍 Available endpoints:`);
  console.log(`   GET http://localhost:${PORT}/health`);
  console.log(`   GET http://localhost:${PORT}/api/deadlines`);
  console.log(`   GET http://localhost:${PORT}/api/career-pathways`);
  console.log(`   GET http://localhost:${PORT}/api/colleges`);
  console.log(`   GET http://localhost:${PORT}/api/colleges?type=top`);
  console.log(`   GET http://localhost:${PORT}/api/colleges?q=delhi\n`);
});