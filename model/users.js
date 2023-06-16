const fs = require('fs');

const usersFilePath = 'users.xml';

const createModel = () => {
  fs.access(usersFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      const initialData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <users>
      <user>
        <id>1</id>
        <name>John Doe</name>
        <email>john@example.com</email>
      </user>
      <user>
        <id>2</id>
        <name>Jane Smith</name>
        <email>jane@example.com</email>
      </user>
    </users>`;

      fs.writeFile(usersFilePath, initialData, (err) => {
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