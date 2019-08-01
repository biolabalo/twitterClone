const express = require('express');
const router = express.Router();
const authController = require('./controllers/authControllers');
const tweetController = require('./controllers/tweetController');
const followController = require('./controllers/followControllers');

const verifyUser = require('./utils/verifyToken');
const { validateSignupData, validateLoginData } = require('./utils/validator')

router.post('/verifyEmail',  authController.verifyEmail)
router.post('/signUp', validateSignupData, authController.signUp );
router.post('/login', validateLoginData, authController.login );
router.post('/postNewTweet', tweetController.postTweet);
router.post('/verifyHandle',  authController.verifyHandle );
router.get('/fetchUserDetails', authController.fetchUserDetails)
router.get('/fetchTweets', tweetController.fetchTweets)
router.post('/likeTweet',    tweetController.likeTweet)
router.post('/unLikeTweet',  tweetController.unLikeTweet)
router.post('/retweet', tweetController.retweet)
router.get('/usersNotBeingFollowed', verifyUser ,followController.usersNotBeingFollowed)
router.post('/followUser', verifyUser ,followController.followUser)
router.post('/unFollowUser', verifyUser ,followController.unFollowUser)

module.exports = router;