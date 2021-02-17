const keys = require('../keys');

module.exports = function (email) {
   return {
      to: email,
      from: keys.EMAIL_FROM,
      subject: 'Account created!',
      html: `
         <h1>Welcome to our store!</h1>
         <p>You have successfully created an account by email — ${email}</p>
         <hr/>
         <a href="${keys.BASE_URL}">Go to website http://localhost:3000</a>
      `
   };
};