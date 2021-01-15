const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
});

// engine registration
app.engine('hbs', hbs.engine);
// start using the engine
app.set('view engine', 'hbs');
// folder in which templates will be stored
app.set('views', 'views');
// add midlleware
app.use(express.static('public'));

app.get('/', (req, res) => {
   // when using HTML
   // res.sendFile(path.join(__dirname, 'views', 'index.html'));
   res.render('index');
});

app.get('/about', (req, res) => {
   // when using HTML
   // res.sendFile(path.join(__dirname, 'views', 'about.html'));
   res.render('about');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});