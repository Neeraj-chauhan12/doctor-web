const jwt = require("jsonwebtoken");

exports.verifyPatient = async (req, res, next) => {
  //const token=req.cookies.token || req.header('Authorization')?.replace('Bearer ','');

  let token = req.cookies && req.cookies.token;
  if (!token) {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET1);
    req.patient = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
