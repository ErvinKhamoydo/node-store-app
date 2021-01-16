const {
   Router
} = require('express');

const router = Router();

router.get('/', (req, res) => {
   // when using HTML
   // res.sendFile(path.join(__dirname, 'views', 'index.html'));
   res.render('index', {
      title: 'Home page',
      isHome: true
   });
});


module.exports = router;