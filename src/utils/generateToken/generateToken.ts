const jwt = require("jsonwebtoken");
function getToken(user: any) {
  return jwt.sign({ data: user }, "SECRET123", {
    expiresIn: "5h",
  });
}
export default getToken;
