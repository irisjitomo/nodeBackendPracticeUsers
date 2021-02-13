// import express
const express = require('express');
// create env file and use dotenv.config() to use env file
require('dotenv').config();

const server = express();

const userRouter = require('./router/user-router')

// middlewares (custom too)
server.use(express.json());
server.use('/api', userRouter)

// make get request to root endpoint '/'
server.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello' });
});

// listen to server on port 4000
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
