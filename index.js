// import express
const express = require('express');
// create env file and use dotenv.config() to use env file
require('dotenv').config();

const server = express();

// create some state

const desserts = [
	{
		name: 'cake'
	},
	{
		name: 'chocolate'
	}
];

// middlewares (custom too)

function logger(req, next){
    // console.log(`Used ${req.method} request`)
    console.log(`[${new Date().toISOString()}] ${req.method}`)
    next();
}
server.use(express.json());
// server.use(logger)

// make get request to root endpoint '/'
server.get('/', (res) => {
	res.status(200).json({ message: 'Hello' });
});

// make get request to /whatever to access whatever state

server.get('/dessert', (req, res) => {
	res.status(200).json(desserts);
});

// make POST request to post to whatever state

server.post('/dessert', (req, res) => {
	if (req.body.name) {
		desserts.push(req.body);
		res.status(201).json(desserts);
	} else {
		res.status(404).json({ message: 'must contain a body' });
	}
});

// listen to server on port 4000
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
