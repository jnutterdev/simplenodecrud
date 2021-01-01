const express = require('express');
const router = express.Router();
const dbLookup = require('../controllers/db.controller');

router.get('/', dbLookup.displayHome);

router.get('/users', dbLookup.getUsers);

router.get('/users/:id', dbLookup.getUserById);

router.post('/users', dbLookup.createUser);

router.put('/users/:id', dbLookup.updateUser);

router.delete('/users/:id', dbLookup.deleteUser);

module.exports = router;