const express = require('express');
const morgan = require('morgan'); 
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const logs = require('./api/log');

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(helmet()); 
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
    res.json({message: 'Hello there'});
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// mongoose db
mongoose.connect('mongodb://localhost:27017',
{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
    () => console.log('connected to db!')
);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});