const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

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
  res.render(req.params.version);
});

app.post('/submit', (req, res) => {
  console.log('REQUEST PARAMS', req.body);
  res.json(req.body);
});

app.listen(9091, () => {
  console.log('Application started on port 9091');
});
