const JWT = require("jsonwebtoken");

const User = require("../models/User");
const PasswordHelper = require("../utils/PasswordHelper");

module.exports = {
  async login(req, res) {
    const { email, pass } = req.body;

    // verifica se o e-mail existe na base
    const user = await User.findOne({ email });
    if (!user) {
      return req
        .status(400)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    // verifica o password
    const passMatch = await PasswordHelper.compare(pass, user.pass);
    if (!passMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    // calcular o tempo para o jwt expirar
    const secondsToExpire =
      Math.floor(Date.now() / 1000) + 60 * process.env.JWT_MINUTES;

    // gerar o JWT
    const jwtPayload = {
      iss: process.env.JWT_ISSUE,
      sub: user.id,
      exp: secondsToExpire
    };
    const token = JWT.sign(jwtPayload, process.env.JWT_KEY, {
      algorithm: process.env.JWT_ALGORITHM
    });

    // return success
    return res.json({
      success: true,
      message: "Usuário logado com sucesso",
      token
    });
  }
};
