const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// For using middleware
app.use(express.json());

app.use(cors());

// Routes Importing and Setting up the API Endpoints
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log("App running on port 5000");
});