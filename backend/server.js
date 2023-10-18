// mongodb
require('./config/dbs');

const express = require("express");
const app = express(); // Use the express function to create an app.
const port = 3000;

const UserRouter = require('./api/User');

app.use('/user', UserRouter);
const bodyParser = require("express");
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Use backticks (`) to interpolate the port variable
});
