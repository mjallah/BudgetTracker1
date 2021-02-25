const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const DB = process.env.DB;



const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
mongoose.connect(
    process.env.MONGODB_URI || `mongodb://${HOST}/${DB}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

// `
// 
//Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

module.exports = app;
