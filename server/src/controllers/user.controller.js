const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require('../helpers/generateToken');

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
  const {
    params: { userId },
  } = req;
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
  const {
    params: { userId },
  } = req;

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

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    await user.update(body);
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, isMale, avatar } = req.body;

    const exitingUser = await User.findOne({ where: { email } });
    if (exitingUser) {
      return res
        .status(400)
        .send({ error: "User with this email already exists" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      isMale,
      avatar,
    });

    const token = generateToken(newUser);

    res.status(201).send({ message: "User created successfully", token, data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginUser = await User.findOne({ where: { email } });
    if (!loginUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = generateToken(loginUser);
    res.status(200).send({ message: "Login successful", token, data: loginUser });
  } catch (error) {
    next(error);
  }
};
