const path = require('path');
const sequelize = require('./config/connection');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sess ={
  secret: 'Super secret secret',
  cookie: {
    maxAge: 360000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/index'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });