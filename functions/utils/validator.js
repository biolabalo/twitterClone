const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

exports.validateSignupData = (req, res, next) => {
  let errors = {};
  console.log( 'hello', req, req.body, req.body.email)
  if (isEmpty(req.body.email || '')) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(req.body.email || '')) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(req.body.password || '')) errors.password = 'Must not be empty';
  if (isEmpty(req.body.name || '')) errors.name = 'Must not be empty';
  if (req.body.password.trim().length < 5 || '') errors.password = 'Password Must not be greater than 5';
  if (isEmpty(req.body.handle || '')) errors.handle = 'Must not be empty';
  if(Object.keys(errors).length === 0) return next();

  return res.status(400).json({
    errors
  });
};

exports.validateLoginData = (req, res, next) => {
  let errors = {};
  if (isEmpty(req.body.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(req.body.email)) {
    errors.email = 'Must be a valid email address';
  }
  if (isEmpty(req.body.password)) errors.password = 'Must not be empty';
  if(Object.keys(errors).length === 0) return next();

  return res.status(400).json({
    errors
  });
};