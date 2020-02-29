var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser')
const sgMail = require('@sendgrid/mail');
var cors = require('cors')
sgMail.setApiKey(
  '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'
);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors());

app.post("/sendVerificationCode", async (req, res) => {


  const msg = {
    to: `${req.body.email}`,
    from: 'buzzme@test.com',
    subject: 'Confirm your email address',
    text: 'and easy to do anywhere',
    html: `<strong>Your Verification Code: ${req.body.vcode}</strong>`,
  };
  sgMail.send(msg);

});

app.listen(process.env.PORT || 4000, function() {
  console.log("Node app is working!");
});