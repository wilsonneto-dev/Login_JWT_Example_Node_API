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

    // gerar o JWT
    const jwtPayload = {
      iss: process.env.JWT_ISSUE,
      sub: user.id
    };
    const token = JWT.sign(jwtPayload, process.env.JWT_KEY, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: `${process.env.JWT_MINUTES}m`
    });

    // gerar o REFRESH JWT
    const refreshKey = `${process.env.JWT_REFRESH_KEY}${user.pass}`;
    const refreshToken = JWT.sign(jwtPayload, refreshKey, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: `${process.env.JWT_REFRESH_DAYS}d`
    });

    // return success
    return res.json({
      success: true,
      message: "Usuário logado com sucesso",
      token,
      refreshToken
    });
  },

  async refresh(req, res) {
    const refreshToken = req.headers["refresh-token"];

    const failure = () => {
      return res
        .status(400)
        .json({ success: false, message: "Acesso não autorizado" });
    };

    // decodar sem verificar a assinatura para pegar a senha do user
    // pegar a senha pois ela faz parte da chave
    const decodedJWT = JWT.decode(refreshToken);
    if (!(decodedJWT && decodedJWT.sub)) {
      return failure();
    }

    const user = await User.findById(decodedJWT.sub);
    if (!user) return failure();

    // gera a chave baseada na senha e segredo e verifica o token
    const refreshKey = `${process.env.JWT_REFRESH_KEY}${user.pass}`;
    JWT.verify(refreshToken, refreshKey, (err, tokenData) => {
      if (err) return failure();

      // token ok, gerar novo
      const jwtPayload = {
        iss: process.env.JWT_ISSUE,
        sub: user.id
      };
      const token = JWT.sign(jwtPayload, process.env.JWT_KEY, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: `${process.env.JWT_MINUTES}m`
      });

      return res.json({
        success: true,
        message: "autorizado",
        token
      });
    });
  }
};
