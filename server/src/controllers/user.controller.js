const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.findById = async (req, res, next) => {
  const { params: { userId } } = req;
  if (!userId) {
    return res.status(400).send({ error: "User ID is required" });
  }
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { params: { userId } } = req;
 
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    await user.destroy();

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
