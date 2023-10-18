const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const articles = require('./routes/api/articles');
const routes = require('./routes/api/articles');
const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/articles', articles);
app.use('/api', routes);
app.use('/user', UserRouter);

const bodyParser = require("express");
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

