const express = require('express');
const cors = require('cors');
const deadlinesRouter = require('./deadlines');
const careerPathwaysRouter = require('./careerPathways');
const collegesRouter = require('./colleges');
const app = express();

app.use(cors());
app.use('/api/deadlines', deadlinesRouter);
app.use('/api/career-pathways', careerPathwaysRouter);
app.use('/api/colleges', collegesRouter);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});