require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
.on('error', (error) => {
    console.log(error);
})
.once('connected', () => {
    console.log('Database Connected!');
})

// requiring all routers
const authRoute = require('./routes/auth');
const userRoute = require('./routes/userRoutes');
const todoRoute = require('./routes/todoRoutes');

// users route
app.use('/auth/', authRoute);
// app.use('/users', userRoute);
app.use('/todos', todoRoute);

// listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}!`);
});