const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));


// TEMPLATING ENGINE COMPONENTS
const path = require('path');
app.set('view options', { layout: './views/layouts/index' });
app.set('view engine', 'ejs');


const routes = require('./routes/routes');
app.use('/', routes);


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})