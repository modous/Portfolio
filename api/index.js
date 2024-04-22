require("dotenv").config();

// Import the express module
const express = require("express");

const path = require("path"); // Import the path module

// Create a new express app
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Set the appropriate MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});

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
app.set("views", path.join(__dirname, "../views"));
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
          image2 {
            url
          }
          project1 {
            url
          }
        }
      }
    `;

    const { people } = await client.request(query);

    res.render("index", { people });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error appropriately, perhaps render an error page
    res.status(500).send("Error fetching data");
  }
});

// Create a GET route for the work page
app.get("/work", async function (_, res) {
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
          project1 {
            url
          }
          project2 {
            url
          }
          project3 {
            url
          }
        }
      }
    `;

    const { people } = await client.request(query);

    // Render the 'work' template and pass the 'people' object to the 'head.ejs' partial
    res.render("work", { people });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error appropriately, perhaps render an error page
    res.status(500).send("Error fetching data");
  }
});

// Create a route for going back to the home page
app.get("/goback", function (req, res) {
  res.redirect("/");
});

// Set the port number for express to listen on
app.set("port", process.env.PORT || 8000);

// Start express, using the port number previously set
app.listen(app.get("port"), function () {
  // Log a message in the console and provide the port number
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
