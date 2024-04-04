require("dotenv").config();

// Import the express module
const express = require("express");

// Create a new express app
const app = express();

const { AwesomeGraphQLClient } = require("awesome-graphql-client");
const fetch = require("node-fetch");

const client = new AwesomeGraphQLClient({
  endpoint: process.env.HYGRAPH_URL,
  fetch,
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_KEY}`,
  },
});

// Set ejs as the template engine
app.set("view engine", "ejs");

// Create a GET route for the index
app.get("/", async function (_, res) {
  try {
    const query = `
      {
        people {
          fullname
          age
          birthdate
          id
          title
          aboutMe {
            text
          }
          image {
            url
          }
        }
      }
    `;

    const { people } = await client.request(query);

    res.render("index", { people });
    console.log(people);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error appropriately, perhaps render an error page
    res.status(500).send("Error fetching data");
  }
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
