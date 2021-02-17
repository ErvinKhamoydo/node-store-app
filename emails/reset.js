const keys = require('../keys');

module.exports = function(email, token) {
   return {
      to: email,
      from: keys.EMAIL_FROM,
      subject: 'Password recovery',
      html: `
         <h1>Do you forget your password?</h1>
         <p>If not then ignore this message</p>
         <p>Otherwise follow the link:</p>
         <p><a href="${keys.BASE_URL}/auth/password/${token}">${keys.BASE_URL}/auth/password/${token}</a></p>
         <hr/>
         <a href="${keys.BASE_URL}">Go to website http://localhost:3000</a>
      `
   };
};