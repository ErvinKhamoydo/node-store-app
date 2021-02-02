const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');

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

// add middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
   try {
      const url = `mongodb+srv://ervin_khamoido:HC7pdifd3Lymwc2F@cluster0.ig4sx.mongodb.net/<dbname>?retryWrites=true&w=majority`;
      await mongoose.connect(url, {useNewUrlParser: true});

      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch(e) {
      console.log(e);
   }
}
start();