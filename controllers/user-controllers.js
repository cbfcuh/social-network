const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const user = await User.find();

            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            
            if(!user) {
                return res.status(404).json({ message: 'No user exists with that ID' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if(!user) {
                res.status(404).json({ message: 'No user with this id' })
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try { 
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
                );

            if(!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
          );
    
          if(!user) {
            return res.status(404).json({ message: 'No user found with this ID' });
          }
          
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    }
};