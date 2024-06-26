const express = require('express');
const routes = express.Router();

const {
    addUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserById
} = require('../controller');

// Route untuk mendapatkan semua user
routes.get('/pab/users', getAllUser);

// Route untuk mendapatkan user berdasarkan id
routes.get('/pab/users/:id', getUserById);

// Route untuk menambahkan user baru
routes.post('/pab/users', addUser);

// Route untuk memperbarui user berdasarkan id
routes.put('/pab/users/:id', updateUser);

// Route untuk menghapus user berdasarkan id
routes.delete('/pab/users/:id', deleteUser);

module.exports = routes;
