const jwt = require('jsonwebtoken');
const user =require ("../Models/userModel")

function createToken(req, res, next) {
    const { name, password } = req.body;
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Check if this prints your secret
    if (!process.env.JWT_SECRET) {
        return res.status(500).send('JWT_SECRET is not set.');
    }
    const token = jwt.sign({ name: name, password: password }, process.env.JWT_SECRET);
    res.accessToken = token;
    console.log(res.accessToken)
    next();
}
async function auth (req, res, next) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user2 = await user.find({ password: decoded.password });
    req.userId =user2.userId
     next();
  } catch {
    res.status(401).send("unautorizied");
  }
}
module.exports ={ createToken, auth}