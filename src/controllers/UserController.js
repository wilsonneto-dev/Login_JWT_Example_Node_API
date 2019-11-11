const User = require("../models/User");
const PasswordHelper = require("../utils/PasswordHelper");

module.exports = {
  async store(req, res) {
    const { name, email, pass } = req.body;
    const hashedPass = await PasswordHelper.hash(pass);

    //verificar se o e-mail já está na base
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(409).json({
        success: false,
        message: "E-mail já consta em nosso banco de dados"
      });
    }

    // caso não exista cria na base
    const user = await User.create({
      name,
      email,
      pass: hashedPass
    });

    return res.json({
      success: true,
      message: "Usuário cadastrado com sucesso"
    });
  }
};
