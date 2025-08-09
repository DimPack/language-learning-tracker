const { Router } = require('express');
const { createUser, findAllUsers, findById, deleteUserById, updateUser, registerUser, login } = require('../controllers/user.controller');
const { validateUserRegister } = require('../middleware/validateUserRegister');

const router = Router();

router.post('/register', validateUserRegister, registerUser);
router.post('/login', login);

router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:userId', findById);
router.delete('/users/:userId', deleteUserById);
router.patch('/users/:userId', updateUser);


module.exports = router;