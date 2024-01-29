// adduser.js
const fs = require("fs");

function addUser(username, age, email, phone) {
  const newData = {
    username: username,
    age: age,
    email: email,
    phone: phone,
  };

  // Read the existing data from datasource.json
  const data = fs.readFileSync("datasource.json", "utf-8");
  let users = JSON.parse(data);

  // Add the new user to the array
  users.push(newData);

  // Write the updated data back to the file
  fs.writeFileSync("datasource.json", JSON.stringify(users));

  console.log("User added successfully.");
}

module.exports = addUser;
