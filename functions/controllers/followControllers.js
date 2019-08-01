const firebase = require('firebase');
const { admin, db } = require('../utils/db');

exports.usersNotBeingFollowed = async function(req,res){
 let usersIfollowArray = []
 let generalUsersArrayIncludingUser = []
 let allUsersDetails = []
  try{
    // i need to find users who i already follow
    const usersIfollow = await db.collection('following').where('FollowingUser', "==", req.user.uid).get();
    usersIfollow.forEach(each => usersIfollowArray.push(each.data()))  
    const users_I_follow_Array = usersIfollowArray.map(each => each['UserBeingFollowed'])
     
    // i need to also deduct general users(query limit) who i follow from general users 
    await db.collection('users').get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {  generalUsersArrayIncludingUser.push(doc.data().userId) });
        querySnapshot.docs.forEach(doc => {  allUsersDetails.push(doc.data()) });
    });

    const generalUsersArray = generalUsersArrayIncludingUser.filter(each => each !== req.user.uid)
   
    // users I haven't followed
    const users_not_followed  = generalUsersArray.filter(user => !users_I_follow_Array.includes(user));
  
     // DETAILS OF USER I HAVEN'T FOLLOWED
     const neededData = allUsersDetails.filter(eachUser => users_not_followed.includes(eachUser.userId))
      
     res.status(200).json(neededData);

  }catch(error){
    res.status(500).json({ error });
  }
 };




 exports.followUser = async function(req,res){
  const userArray = []
   try{
  
    const querySnapshot = await  db.collection('following').where('FollowingUser', '==', req.user.uid).where('UserBeingFollowed', '==', req.body.userToBeFollowed).get()
    
    querySnapshot.forEach(each => userArray.push( each.data())) 
    
    if(userArray.length) return res.status(400).json({ msg:'you cannot perform that operation'})
    
    const newFollowing = { FollowingUser:req.user.uid, UserBeingFollowed: req.body.userToBeFollowed} 
  
    const newFollowingCreated =  await db.collection('following').add(newFollowing)
    res.status(200).json(newFollowingCreated)
   }catch(error){
     res.status(500).json({ error });
   }
  };



 exports.unFollowUser = async function(req,res){
  const userArray = []
  try{
    const querySnapshot = await  db.collection('following').where('FollowingUser', '==', req.user.uid).where('UserBeingFollowed', '==', req.body.userToBeUnFollowed).get()
    await querySnapshot.forEach(each =>  each.ref.delete())  
    return res.status(200).json({ msg:'you have successfully unfollowed'})
  }catch(error){
    res.status(500).json({ error });
  }
 };