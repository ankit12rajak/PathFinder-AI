const express = require('express');
const app = express();
const deadlinesRouter = require('./deadlines');

app.use('/api/deadlines', deadlinesRouter);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});