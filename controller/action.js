const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ explicitArray: false });

const auctionFilePath = 'auction.xml';

// Retrieve all items at the auction
exports.getAllItems = (req, res) => {
  fs.readFile(auctionFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const items = result.auction.item;
      res.json(items);
    });
  });
};

// Retrieve information about a specific item at the auction
exports.getItemById = (req, res) => {
  const itemId = req.params.id;

  fs.readFile(auctionFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const items = result.auction.item;
      const item = items.find((item) => item.id === itemId);

      if (!item) {
        return res.status(404).send('Item not found');
      }

      res.json(item);
    });
  });
};

// Add a new item to the auction
exports.addItem = (req, res) => {
  const newItem = req.body;

  fs.readFile(auctionFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const items = result.auction.item;
      items.push(newItem);

      const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

      fs.writeFile(auctionFilePath, updatedXml, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.status(201).send('Item added to auction successfully');
      });
    });
  });
};

// Edit an item in the auction
exports.editItem = (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  fs.readFile(auctionFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const items = result.auction.item;
      const itemIndex = items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        return res.status(404).send('Item not found');
      }

      items[itemIndex] = updatedItem;

      const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

      fs.writeFile(auctionFilePath, updatedXml, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.status(200).send('Item updated successfully');
      });
    });
  });
};

