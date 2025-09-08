const { Router } = require('express');
const { validateUserRegister, validateUserLogin } = require('../middleware/validation');
const { createUser, findAllUsers, findById, deleteUserById, updateUser, registerUser, login } = require('../controllers/user.controller');
const { checkAccessToken } = require('../middleware/authMiddlewares');

const router = Router();

router.post('/register', validateUserRegister, registerUser);
router.post('/login', validateUserLogin, login);

router.use(checkAccessToken);
router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:userId', findById);
router.delete('/users/:userId', deleteUserById);
router.patch('/users/:userId', updateUser);


module.exports = router;