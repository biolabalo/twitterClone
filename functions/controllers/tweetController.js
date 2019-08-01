const firebase = require('firebase');
const { db } = require('../utils/db');
// const  channels_client = require('../utils/pusher');






exports.postTweet= async function(req,res){

  if (req.body.tweet.trim() === ''){
    return res.status(400).json({ body: 'Body must not be empty' });
  }
  try{
    const newTweet = await db.collection('tweets').add({
      tweet: req.body.tweet,
      createdAt: new Date().toISOString(),
      userHandle: req.body.userHandle,
      userImageUrl:req.body.userImageUrl,
      userBio:req.body.userBio,
      nameTweetAuthor:req.body.nameTweetAuthor,
      tweetImageUrl: req.body.tweetImage,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    })
   
    return res.status(200).json({
      tweetId: newTweet.id,
      tweet: req.body.tweet,
      createdAt: new Date().toISOString(),
      userHandle: req.body.userHandle,
      userImageUrl:req.body.userImageUrl,
      userBio:req.body.userBio,
      nameTweetAuthor:req.body.nameTweetAuthor,
      tweetImageUrl: req.body.tweetImage,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    });
  }catch(error){
    res.status(500).json({ error });
  }
 };

 exports.retweet = async function(req,res){

  try{
    const newTweet = await db.collection('retweets').add({
      tweet: req.body.tweet,
      createdAt: new Date().toISOString(),
      userHandle: req.body.userHandle,
      userImageUrl:req.body.userImageUrl,
      userBio:req.body.userBio,
      nameTweetAuthor:req.body.nameTweetAuthor,
      tweetImageUrl: req.body.tweetImage,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    })
    return res.status(200).json({
      tweetId: newTweet.id,
      tweet: req.body.tweet,
      createdAt: new Date().toISOString(),
      userHandle: req.body.userHandle,
      userImageUrl:req.body.userImageUrl,
      userBio:req.body.userBio,
      nameTweetAuthor:req.body.nameTweetAuthor,
      tweetImageUrl: req.body.tweetImage,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    });
  }catch(error){
    res.status(500).json({ error });
  }
 };

exports.fetchTweets = async function(req,res){
  try{
    const tweets = await db.collection('tweets').orderBy('createdAt', 'desc').get();
    const  tweetArray = [];
    tweets.forEach(doc => tweetArray.push({
      tweetId:doc.id,
      commentCount:doc.data().commentCount,
      createdAt:doc.data().createdAt,
      likeCount:doc.data().likeCount,
      nameTweetAuthor:doc.data().nameTweetAuthor,
      retweetCount:doc.data().retweetCount,
      tweet:doc.data().tweet,
      userBio:doc.data().userBio,
      userHandle:doc.data().userHandle,
      userImageUrl:doc.data().userImageUrl,
      tweetImageUrl:doc.data().tweetImageUrl
    }));
   if(tweetArray) return res.status(200).json(tweetArray);
  }catch(error){
    return res
    .status(403)
    .json({ error });
  }

}


//Like Tweets
exports.likeTweet = async function(req,res){
 const likeArray = []
 const array2 = []
try{
 const querySnapshot = await  db.collection('likes').where('tweetID', '==', req.body.tweetID).where('userID', '==', req.body.userID).get()
 querySnapshot.forEach(each => likeArray.push( each.data())) 
 if(likeArray.length) return res.status(400).json({ msg:'you cannot perform that operation'})
    const newLikes = {
      tweetID:req.body.tweetID,
      userID: req.body.userID,
    }
   const newLikesCreated =  await db.collection('likes').add(newLikes)
   const secondQuerySnapshot = await  db.doc(`/tweets/${req.body.tweetID}`).get()
   const currentCountInDb =  secondQuerySnapshot.data().likeCount
   await db.doc(`/tweets/${req.body.tweetID}`).update({ likeCount: currentCountInDb + 1 });
   return res.status(200).json({ msg:'you have successfully liked the tweet'})
}catch(err){
  return res.status(400).json({ err })
}
}

exports.unLikeTweet = async function(req,res){
  const likeArray = []
  const array2 = []
 try{
  const querySnapshot = await  db.collection('likes').where('tweetID', '==', req.body.tweetID).where('userID', '==', req.body.userID).get()
 await querySnapshot.forEach(each =>  each.ref.delete())  


 const secondQuerySnapshot = await  db.doc(`/tweets/${req.body.tweetID}`).get()
 const currentCountInDb =  secondQuerySnapshot.data().likeCount
 if(currentCountInDb === 0 ) return res.status(400).json({ msg:'you cannot perform that operation'})
 await db.doc(`/tweets/${req.body.tweetID}`).update({ likeCount: currentCountInDb - 1 });
 return res.status(200).json({ msg:'you have successfully unliked the tweet'})
 }catch(err){
   return res.status(400).json({ err })
 }
 }


