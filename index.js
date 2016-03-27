const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(9091, () => {
  console.log('Application started on port 9091');
});
