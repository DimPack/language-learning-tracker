const { body, validationResult } = require("express-validator");

module.exports.validateUserRegister = async (req, res, next) => {
  try {
    await body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First name is required")
      .run(req);

    await body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last name is required")
      .run(req);

    await body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail()
      .run(req);

    await body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[a-zA-Z]/)
      .withMessage("Password must contain at least one letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one digit")
      .run(req);

    await body("isMale")
      .isBoolean()
      .withMessage("isMale must be a boolean")
      .run(req);

    await body("avatar")
      .optional()
      .custom((value) => {
        if (typeof value !== "string") {
          throw new Error("Avatar must be a string");
        }
        if (value.includes("http://") || value.includes("https://")) {
          throw new Error("Avatar cannot be a URL");
        }
        if (/\s/.test(value)) {
          throw new Error("Avatar path cannot contain spaces");
        }
        return true;
      })
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateUserLogin = async (req, res, next) => {
 try {
    await body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail()
      .run(req);

    await body("password")
      .notEmpty()
      .withMessage("Password is required")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  } catch (error) {
      next(error);
    }
};