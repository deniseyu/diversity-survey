'use strict';

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const randomise = require('./services/company-randomiser');
const Companies = require('./companies');
const _ = require('lodash');

const hbsParams = {extname: '.hbs', defaultLayout: 'main', layoutsDir: './server/views/layouts', partialsDir: './server/views/partials'};
app.engine('.hbs', exphbs(hbsParams));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');

const submission = {};

app.get('/', (req, res) => {
  console.log(__dirname + '/assets');
  res.render('index');
});

app.get('/start/:version', (req, res) => {
  res.render(`demo-${req.params.version}`);
});

app.post('/submit/demographics/:version', (req, res) => {
  _.merge(submission, req.body);
  console.log(submission);
  res.redirect(`/survey/${req.params.version}`);
});

app.get('/survey/:version', (req, res) => {
  let companies = Companies;
  if (req.params.version === 'short') {
    companies = randomise(companies);
  }

  res.render('survey', { companies });
});

app.post('/submit/results', (req, res) => {
  _.merge(submission, { ratings: req.body });
  console.log(submission);
  res.json(submission);
  //res.render('thanks');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("This page doesn't exist.");
});

app.listen(9091, () => {
  console.log('Application started on port 9091');
});
