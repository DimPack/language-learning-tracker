const { Router } = require('express');
const { createUser, findAllUsers, findById, deleteUserById, updateUser } = require('../controllers/user.controller');

const router = Router();


router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:userId', findById);
router.delete('/users/:userId', deleteUserById);
router.patch('/users/:userId', updateUser)

module.exports = router;
