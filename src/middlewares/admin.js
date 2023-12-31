// module.exports = function (req, res, next) {
//   if (!req.user.isAdmin) res.status(403).send('Access Denied');
//   next();
// };

const jwt = require('jsonwebtoken');

function admin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied...Please login');
  try {
    const decoded = jwt.verify(token, process.env.JWTPrivateKey);
    req.user = decoded;
    if (req.user.role !== 'admin')
      res.status(403).send('You are not authorized to perform this action...');
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = admin;
