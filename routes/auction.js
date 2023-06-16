const express = require('express');
const auctionRouter = express.Router();

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ explicitArray: false });

const auctionController = require('../controller/action');

const auctionFilePath = 'auction.xml';

// Retrieve all items at the auction
auctionRouter.get('/items', auctionController.getAllItems);

// Retrieve information about a specific item at the auction
auctionRouter.get('/items/:id', auctionController.getItemById);

// Add a new item to the auction
auctionRouter.post('/items', auctionController.addItem);

// Edit an item in the auction
auctionRouter.put('/items/:id', auctionController.editItem);

module.exports = auctionRouter;