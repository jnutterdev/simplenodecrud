const express = require('express');
const router = express.Router();
const dbLookup = require('../controllers/db.controller');

router.get('/', dbLookup.displayHome);

router.get('/users', dbLookup.getUsers);

router.get('/users/:id', dbLookup.getUserById);

router.get('/new-user', dbLookup.newUser);

router.get('/update-user/:id', dbLookup.userUpdateConfirm);

router.get('/delete-user', dbLookup.deleteConfirm);

router.post('/users', dbLookup.createUser);

// router.put('/update-user/:id', dbLookup.updateUser);

router.delete('/delete-user/:id', dbLookup.deleteUser);

module.exports = router;