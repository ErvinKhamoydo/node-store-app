const { Router } = require('express');
const Course = require('../models/course');

const router = Router();

router.get('/', async (req, res) => {
   // Without Mongoose
   // const courses = await Course.getAll();
   const courses = await Course.find()
      .populate('userId', 'email name')
      .select('title price img');
   
   res.render('courses', {
      title: 'Courses',
      isCourses: true,
      courses
   });
});

router.get('/:id/edit', async (req, res) => {
   if (!req.query.allow) {
      return res.redirect('/');
   }

   // Without Mongoose
   // const course = await Course.getById(req.params.id);
   const course = await Course.findById(req.params.id);

   res.render('course-edit', {
      title: `Edit ${course.title}`,
      course
   });
});

router.post('/edit', async (req, res) => {
   // Without Mongoose
   // await Course.update(req.body);
   const {id} = req.body;
   delete req.body.id;

   await Course.findByIdAndUpdate(id, req.body);
   res.redirect('/courses');
});

router.post('/remove', async (req, res) => {
   try {
      await Course.deleteOne({_id: req.body.id});
      res.redirect('/courses');
   } catch (error) {
      console.log(error);
   }
});

router.get('/:id', async (req, res) => {
   // Without Mongoose
   // const course = await Course.getById(req.params.id);
   const course = await Course.findById(req.params.id);
   res.render('course', {
      layout: 'empty',
      title: `Course ${course.title}`,
      course
   });
});

module.exports = router;