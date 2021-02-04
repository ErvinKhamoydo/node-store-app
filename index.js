const express = require('express');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
   allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const path = require('path');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const User = require('./models/user');

const app = express();

const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs',
   handlebars: allowInsecurePrototypeAccess(handlebars)
});

// engine registration
app.engine('hbs', hbs.engine);
// start using the engine
app.set('view engine', 'hbs');
// folder in which templates will be stored
app.set('views', 'views');

app.use(async (req, res, next) => {
   try {
      const user = await User.findById('601a87f76e26e74778605a92');
      req.user = user;
      next();
   } catch (error) {
      console.log(error);
   }
});

// add middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
   extended: true
}));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
   try {
      const url = `mongodb+srv://ervin_khamoido:HC7pdifd3Lymwc2F@cluster0.ig4sx.mongodb.net/store?retryWrites=true&w=majority`;
      await mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false
      });

      const candidate = await User.findOne();

      if (!candidate) {
         const user = new User({
            email: 'hamoydoerik@gmail.com',
            name: 'Ervin',
            cart: {
               items: []
            }
         });

         await user.save();
      }

      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
}
start();