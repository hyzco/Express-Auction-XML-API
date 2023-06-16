const fs = require('fs');

const auctionFilePath = 'auction.xml';

const createModel = () => {
  fs.access(auctionFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      const initialData = `<?xml version="1.0" encoding="UTF-8"?>
    <auction>
      <item>
        <id>1</id>
        <name>Item 1</name>
        <description>Description of Item 1</description>
        <currentBid>100</currentBid>
      </item>
      <item>
        <id>2</id>
        <name>Item 2</name>
        <description>Description of Item 2</description>
        <currentBid>50</currentBid>
      </item>
    </auction>`;


      fs.writeFile(auctionFilePath, initialData, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('users.xml created successfully');
        }
      });
    }
  });
}

module.exports = createModel;