const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const app = express();

const hbs = exphbs.create({});

// Set up view engine (Handlebars)
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// app.set('views', path.join(__dirname, 'views'));

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "your-secret-key", resave: false, saveUninitialized: true })
);

// Set up view engine (Handlebars)
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Define routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
