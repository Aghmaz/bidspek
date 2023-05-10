const { verifyAuthToken, verifyRefreshToken } = require("../utils/helpers");

const authHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ message: "Access denied, Auth token is not provided" });
  }

  const authHeader = req.headers.authorization;
  const authHeaderParts = authHeader.split(" ");
  if (authHeaderParts.length !== 2) {
    return res.status(400).send({ message: "Invalid authorization header" });
  }

  const tokenType = authHeaderParts[0];
  const token = authHeaderParts[1];
  let payload;

  try {
    if (tokenType === "Bearer") {
      payload = verifyAuthToken(token);
    } else if (tokenType === "Refresh") {
      payload = verifyRefreshToken(token);
    } else {
      return res.status(400).send({ message: "Invalid token type" });
    }

    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = authHandler;
