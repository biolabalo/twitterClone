const firebase = require("firebase");
const { db } = require("../utils/db");
require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationCode = async (req, res) => {
const msg = {
  to: req.body.email,
  from: 'verify@twitter.com',
  subject: `${req.body.vcode}is your Twitte verification code`,
  text: 'Confirm your email address',
  html: `
  Please enter this verification code to get started on Twitter:
  ${req.body.vcode}
  Verification codes expire after two hours.
   
  Thanks,
  Twitter`,
};

sgMail.send(msg);

}

exports.fetchUserDetails = async (req, res) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1]; // 'Bearer jh3uj3jedjd3'
  } else {
    return res.status(403).json({ error: "Unauthorized" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken); // similar to  jwt.verify
    const data = await db // with jwt you are incontroll of the the payload in the token and as such your req.user can contain many info you want
      .collection("users")
      .where("userId", "==", decodedToken.uid)
      .limit(1)
      .get();

    let likedTweets = [];
    const querySnapshot = await db
      .collection("likes")
      .where("userID", "==", decodedToken.uid)
      .get();
    querySnapshot.forEach(doc => likedTweets.push(doc.data()));

    let reTweetedTweets = [];
    const querySnapshotRetweets = await db
      .collection("Retweets")
      .where("userID", "==", decodedToken.uid)
      .get();
    querySnapshotRetweets.forEach(doc => reTweetedTweets.push(doc.data()));

    // //get user followers and following details
    var usersBeingFollowed = [];
    var followers = [];

    // fetches an Array of people following me
    const usersWhoFollowMeResult = await db
      .collection("following")
      .where("UserBeingFollowed", "==", decodedToken.uid)
      .get();
    usersWhoFollowMeResult.forEach(doc => followers.push(doc.data()));
    followers = followers.map(eachUser => eachUser.FollowingUser);

    // fetches an Array of  people I follow
    const usersBeingFollowedResult = await db
      .collection("following")
      .where("FollowingUser", "==", decodedToken.uid)
      .get();
    usersBeingFollowedResult.forEach(doc =>
      usersBeingFollowed.push(doc.data())
    );
    usersBeingFollowed = usersBeingFollowed.map(each => each.UserBeingFollowed);

    return res
      .status(200)
      .json([
        data.docs[0].data(),
        likedTweets,
        { usersBeingFollowed: usersBeingFollowed },
        { followers: followers },
        reTweetedTweets
      ]);
  } catch (err) {
    return res.status(403).json(err);
  }
};

exports.verifyHandle = async (req, res) => {
  try {
    //db.doc(`users/{req.body.handle}`);
    checkIfHandleExists = await db
      .collection("users")
      .doc(req.body.handle)
      .get();

    if (checkIfHandleExists.exists)
      return res
        .status(200)
        .send({ mssg: "You cannot use that handle", canUse: false });
    return res
      .status(200)
      .send({ mssg: "You can use that handle", canUse: true });
  } catch (err) {
    return res.status(400).send({ mssg: "Failed to validate handle", err });
  }
};

exports.signUp = async function(req, res) {
  try {
    //db.doc(`users/{req.body.handle}`);
    checkIfHandleExists = await db
      .collection("users")
      .doc(req.body.handle)
      .get();

    if (checkIfHandleExists.exists)
      return res.status(200).send({ mssg: "You cannot use that handle" });

    const newUserInAuthCollection = await firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password);

    const token = await newUserInAuthCollection.user.getIdToken();

    const newUserIncollection = await db
      .collection("users")
      .doc(req.body.handle)
      .set({
        bio: req.body.bio,
        gender: req.body.gender,
        name: req.body.name,
        handle: req.body.handle,
        createdAt: new Date().toISOString(),
        userId: newUserInAuthCollection.user.uid,
        email: req.body.email,
        userImageUrl:
          req.body.imageUrl ||
          "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
      });

    if (newUserIncollection) {
      res.status(201).json({ mssg: "user successfuly created", token });
    }
  } catch (error) {
    if (
      error.code === "auth/email-already-in-use" &&
      error.message ===
        "The email address is already in use by another account."
    ) {
      return res.send({
        errorMessage: "The email address is already in use by another account."
      });
    }
    return res.send({ errorMessage: error.message });
  }
};

exports.login = async function(req, res) {
  try {
    const loggedInUser = await firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password);
    const token = await loggedInUser.user.getIdToken();
    if (token) return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(403)
      .json({ general: "Wrong credentials, please try again" });
  }
};

exports.verifyEmail = async function(req, res) {
  db.collection("users")
    .get()
    .then(snapshot => {
      const usersArray = [];
      snapshot.forEach(doc => usersArray.push(doc.data()));
      const result = usersArray.filter(
        eachUser => eachUser.email === req.body.email
      );
      if (result.length === 0) res.status(200).send({"valid":true,"msg":"Email can be used","taken":false});
      if (result.length === 1) res.status(200).send({"valid":false,"msg":"Email has already been taken.","taken":true});
    })
    .catch(err => {
      res.status(400).send({ err });
    });
};
