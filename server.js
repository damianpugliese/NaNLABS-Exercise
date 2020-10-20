const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, err => {
    if (err) return console.log(`Server Error: ${err}`);
    console.log(`Server on port ${PORT}`);
});