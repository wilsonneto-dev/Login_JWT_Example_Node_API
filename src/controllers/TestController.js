module.exports = {
  async test(req, res) {
    return res.json({
      token: req.token,
      tokenData: req.tokenData,
      now: Math.floor(Date.now() / 1000)
    });
  }
};
