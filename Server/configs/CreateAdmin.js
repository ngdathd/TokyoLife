const User = require('../models/user');
const connection = require('./ConnectDB');

async function addAdmin() {
  try {
    const user = await User.findOne({ email: "admin@gmail.com" });
    if (user) {
      console.error("Admin already exists");
      return;
    }

    const result = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin"
    });
    console.log(`Admin added with the following id: ${result}`);
  } catch (error) {
    console.error("Error add Admin: ", error);
  }
}

require('dotenv').config();
connection();
addAdmin();
