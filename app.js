const http = require("http");
const URL = require("url");
const addUser = require("./adduser");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  // const data = [
  //   { username: "naomi", age: 10 },
  //   { username: "sefa", age: 14 },
  //   { username: "eric", age: 11 },
  // ];

  if (req.url == "/") {
    res.writeHead(200, { Content_Type: "text/html" });
    res.write("welcome");
    res.end();
  } else if (req.url == "/users") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    // Read data from datasource.json
    const data = fs.readFileSync("datasource.json", "utf-8");
    res.write(data); // Send the parsed data directly
    res.end();
  } else if (req.url == "/adduser?username=ben&age=15") {
    const newUrl = URL.parse(req.url, true);
    const params = newUrl.query;
    let u_name = params.username;
    let u_age = params.age;
    let u_email = params.email;
    let u_phone = params.phone;
    addUser(u_name, u_age, u_phone, u_email);
    res.end("record added");
  } else if (req.url.startsWith("/addNewUser")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { Content_Type: "application/json" });
    const newUrl = URL.parse(req.url, true);
    const params = newUrl.query;
    let u_name = params.username;
    let u_age = params.age;
    let u_email = params.email;
    let u_phone = params.phone;
    addUser(u_name, u_age, u_phone, u_email);
    res.end("record added Succesfully");
  } else if (req.url == "/contact") {
    res.writeHead(200, { Content_Type: "text/html" });
    res.write("contact page");
    res.end();
  } else {
    res.writeHead(404, { Content_Type: "text/html" });
    res.end();
  }
});

server.listen(5000, function () {
  console.log("Server running on port 5000");
});
