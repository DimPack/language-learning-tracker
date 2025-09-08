module.exports.checkAccessToken = async (req, res, next) => {
 try {
    const { headers: { authorization } } = req;
    if (!authorization) {
      return res.status(401).send({ error: "Access token is required" });
    }
    next();
  } catch (error) {
      next(error);
    }
};