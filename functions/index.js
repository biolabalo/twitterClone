const routes = require('./routes');
const functions = require('firebase-functions');
const firebase = require('firebase');
const app = require("express")()
var cors = require('cors')
const {db } = require('./utils/db');
 
app.use(cors())

const firebaseConfig = {
  apiKey: "AIzaSyA4mc_iXM-eii5makrk911a7j7b11cr4W4",
  authDomain: "freecodecampapp.firebaseapp.com",
  databaseURL: "https://freecodecampapp.firebaseio.com",
  projectId: "freecodecampapp",
  storageBucket: "freecodecampapp.appspot.com",
  messagingSenderId: "129522297491",
  appId: "1:129522297491:web:d2d89559ff5b02cb"
};

firebase.initializeApp(firebaseConfig)
        
app.use('/', routes);

exports.api = functions.https.onRequest(app);
  