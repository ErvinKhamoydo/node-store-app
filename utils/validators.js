const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
   body('email')
      .isEmail()
      .withMessage('Invalid email!')
      .custom(async (value, {req}) => {
         try {
            const candidate = await User.findOne({
               email: value
            });

            if (candidate) {
               return Promise.reject('User with this email already exist');
            }
         } catch (error) {
            console.log(error);
         }
      })
      .normalizeEmail(),
   body('password', 'Password must be at least 6 characters')
      .isLength({
         min: 6,
         max: 56
      })
      .isAlphanumeric()
      .trim(),
   body('confirm')
      .custom((value, {
         req,
      }) => {
         if (value !== req.body.password) {
            throw new Error('Password mismatch');
         }
         return true;
      })
      .trim(),
   body('name', 'Name must be at least 3 characters')
      .isLength({
         min: 2
      })
      .trim()
];

exports.loginValidators = [
   body('email')
      .isEmail()
      .withMessage('Invalid email!')
      .custom(async (value, {req}) => {
         try {
            const candidate = await User.findOne({
               email: value
            });

            if (!candidate) {
               return Promise.reject('User with this email does not exist');
            }
         } catch (error) {
            console.log(error);
         }
      })
      .normalizeEmail(),
   body('password', 'Invalid password!')
      .isLength({
            min: 6,
            max: 56
         })
      .isAlphanumeric()
      .trim()
];

exports.courseValidators = [
   body('title', 'Minimum name length 2 characters!')
      .isLength({min: 3})
      .trim(),
   body('price', 'Enter correct price!')
      .isNumeric(),
   body('img', 'Enter correct url!')
      .isURL()
];