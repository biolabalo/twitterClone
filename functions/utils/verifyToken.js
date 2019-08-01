const { admin, db } = require('../utils/db');


const verifyUser = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]; // 'Bearer jh3uj3jedjd3'
  } else {
    return res.status(403).json({ error: 'Unauthorized' });
  }
try{
  const decodedToken  =  await admin.auth().verifyIdToken(idToken)  // similar to  jwt.verify

   req.user = decodedToken;
   const data = await db               // with jwt you are incontroll of the the payload in the token and as such your req.user can contain many info you want
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();

   req.user.handle = data.docs[0].data().handle;
   req.user.imageUrl = data.docs[0].data().imageUrl;
  return next();
}catch(err){
    console.error('Error while verifying token ', err);
    return res.status(403).json(err);
}
};
module.exports = verifyUser