const express = require('express');
const xml2js = require('xml2js');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const parser = new xml2js.Parser({ explicitArray: false });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute = require('./routes/users');
const auctionRoute = require('./routes/auction');

const userModel = require('./model/users');
const auctionModel = require('./model/auction');

userModel();
auctionModel();

app.use('/users', userRoute);
app.use('/auction', auctionRoute);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});