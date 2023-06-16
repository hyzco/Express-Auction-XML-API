// userController.js

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ explicitArray: false });

const usersFilePath = 'users.xml';

// Retrieve all users
exports.getAllUsers = (req, res) => {
  fs.readFile('users.xml', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      res.json(result.users.user);
    });
  });
};

// Retrieve a specific user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  fs.readFile('users.xml', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const user = result.users.user.find((user) => user.id[0] === userId);
      if (!user) {
        return res.status(404).send('User not found');
      }

      res.json(user);
    });
  });
};

// Add a new user
exports.addUser = (req, res) => {
  const newUser = req.body;

  fs.readFile('users.xml', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const users = result.users.user;
      users.push(newUser);

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile('users.xml', xml, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.status(201).send('User added successfully');
      });
    });
  });
};

// Update a user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const users = result.users.user;
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        return res.status(404).send('User not found');
      }

      users[userIndex] = updatedUser;

      const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

      fs.writeFile(usersFilePath, updatedXml, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.status(200).send('User updated successfully');
      });
    });
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const users = result.users.user;
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        return res.status(404).send('User not found');
      }

      users.splice(userIndex, 1);

      const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

      fs.writeFile(usersFilePath, updatedXml, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.status(200).send('User deleted successfully');
      });
    });
  });
};

