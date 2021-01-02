const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}));


// TEMPLATING ENGINE COMPONENTS

const path = require('path');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.set('layout', './layouts/index');
app.set('view engine', 'ejs');


const routes = require('./routes/routes');
app.use('/', routes);


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})