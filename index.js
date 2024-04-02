// Import the express module
const express = require("express");

// Create a new express app
const app = express();

const { AwesomeGraphQLClient } = require("awesome-graphql-client");
const fetch = require("node-fetch");

const client = new AwesomeGraphQLClient({
  endpoint:
    "https://api-eu-central-1.hygraph.com/v2/ck8sn5tnf01gc01z89dbc7s0o/master",
  fetch,
});

// Set ejs as the template engine
app.set("view engine", "ejs");

// Create a GET route for the index
app.get("/", async function (_, res) {
  const query = `
      { 
        people {
            age
            birthdate
            fullname
            id
            title
            aboutMe {
              html
            }
          }
      }
    `;

  const { people } = await client.request(query);

  res.render("index", { people });
});

// Create a POST route for the index
app.post("/", function (request, response) {
  // There is no POST handling yet, redirect to GET on /
  response.redirect(303, "/");
});

// Set the port number for express to listen on
app.set("port", process.env.PORT || 8000);

// Start express, using the port number previously set
app.listen(app.get("port"), function () {
  // Log a message in the console and provide the port number
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
