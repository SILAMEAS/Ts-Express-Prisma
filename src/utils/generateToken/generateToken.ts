const jwt = require("jsonwebtoken");
function getToken(user: any) {
  return jwt.sign({ data: user }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5h",
  });
}
export default getToken;
