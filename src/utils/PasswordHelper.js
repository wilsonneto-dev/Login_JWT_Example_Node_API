const bcrypt = require("bcrypt");

module.exports = {
  async hash(password) {
    const saltRounds = 10;

    const promise = new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return promise;
  },

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
};
