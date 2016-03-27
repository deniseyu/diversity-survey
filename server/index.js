const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const randomise = require('./services/company-randomiser');
const companies = require('./companies');

const hbsParams = {extname: '.hbs', defaultLayout: 'main', layoutsDir: './server/views/layouts', partialsDir: './server/views/partials'};
app.engine('.hbs', exphbs(hbsParams));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  console.log(__dirname + '/assets');
  res.render('index');
});

app.get('/start/:version', (req, res) => {
  res.render(`demo-${req.params.version}`);
});

app.post('/submit/demographics/:version', (req, res) => {
  console.log(req.body);
  res.redirect(`/survey/${req.params.version}`);
});

app.get('/survey/:version', (req, res) => {
  if (req.params.version === 'short') {
    const random20 = randomise(companies);
    res.send(random20);
  }

  res.send(companies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("This page doesn't exist.");
});

app.listen(9091, () => {
  console.log('Application started on port 9091');
});
