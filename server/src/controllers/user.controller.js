const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    console.log("User created:", newUser);
    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
};
