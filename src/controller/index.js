const { v4: uuidv4 } = require('uuid');
const db = require('../config/firebase');

module.exports = {
    addUser: async (req, res) => {
        const { name, email, prodi, fakultas } = req.body;

        if (!name || !email || !prodi || !fakultas) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, prodi, and fakultas are required.'
            });
        }

        try {
            const userData = { name, email, prodi, fakultas };

            await db.ref('users').push(userData);

            res.status(201).json({
                success: true,
                message: 'User created successfully.',
                user: userData
            });
        } catch (err) {
            console.error('Server error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to create user due to server error.'
            });
        }
    },

    getAllUser: async (req, res) => {
        try {
            const snapshot = await db.ref('users').once('value');
            const users = snapshot.val();

            if (!users) {
                return res.status(404).json({
                    success: false,
                    message: 'No users found.'
                });
            }

            res.status(200).json({
                success: true,
                users
            });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch user data due to database error.'
            });
        }
    },

    getUserById: async (req, res) => {
        const id = req.params.id;

        try {
            const snapshot = await db.ref('users/' + id).once('value');
            const user = snapshot.val();

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.'
                });
            }

            res.status(200).json({
                success: true,
                user
            });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to get user data by id due to database error.'
            });
        }
    },

    updateUser: async (req, res) => {
        const { name, email, prodi, fakultas } = req.body;
        const id = req.params.id;

        if (!id || !name || !email || !prodi || !fakultas) {
            return res.status(400).json({
                success: false,
                message: 'Id, name, email, prodi, and fakultas are required.'
            });
        }

        try {
            const userData = { name, email, prodi, fakultas };

            const userRef = db.ref('users/' + id);
            const snapshot = await userRef.once('value');

            if (!snapshot.exists()) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.'
                });
            }

            await userRef.update(userData);

            res.status(200).json({
                success: true,
                message: 'User updated successfully.'
            });
        } catch (err) {
            console.error('Server error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to update user due to server error.'
            });
        }
    },

    deleteUser: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Id parameter is required.'
            });
        }

        try {
            const userRef = db.ref('users/' + id);
            const snapshot = await userRef.once('value');

            if (!snapshot.exists()) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.'
                });
            }

            await userRef.remove();

            res.status(200).json({
                success: true,
                message: 'User deleted successfully.'
            });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to delete user due to database error.'
            });
        }
    }
};
