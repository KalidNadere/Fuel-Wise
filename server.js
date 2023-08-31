const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const app = express();
const sequelize = require('./config/config');
const PORT = process.env.PORT || 3001;

//
const hbs = exphbs.create({});

// Set up view engine (Handlebars)
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Setup session cookie
const sess = {
  secret: 'secret key',
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Define routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
