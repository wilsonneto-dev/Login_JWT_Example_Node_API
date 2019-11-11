const JWT = require("jsonwebtoken");

module.exports = {
  protect(req, res, next) {
    const authorization = req.headers["authorization"];

    if (typeof authorization !== "undefined") {
      const bearer = authorization.split(" ");
      const token = bearer[1];
      req.token = token;

      JWT.verify(req.token, process.env.JWT_KEY, (err, tokenData) => {
        if (err) {
          // token inválido
          return res.status(403).json({
            success: false,
            message: "Acesso não autorizado, faça login."
          });
        } else {
          // token ok, continua
          req.tokenData = tokenData;
          next();
        }
      });
    } else {
      // sem token
      return res.status(403).json({
        success: false,
        message: "Acesso não autorizado, faça login."
      });
    }
  }
};
