// "exports" is used to export multiple properties or functions.
const db = require("../models");               //  database  i.e  db          <===    '../models'
const User = db.users;                         //                 db.users    ===>    /database/users




// Create & Save a New User
exports.create = function(req, res) {

    // Validate Request: that If "username" entry is empty, let server_response='Bad request' and 'throw err msg'
    if (!req.body.username) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    // Create New User
    const userData = new User({ 
        username: req.body.username, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password, 
        confirmPassword: req.body.confirmPassword,
        role: "agent",
        permission: ["contact-index"],
        isActive: req.body.isActive ? req.body.isActive : false 
    });

    // Save "New User"
    userData.save(userData)
    .then(data => res.send(data))
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating new User." });
    });
};





// Find all Users
exports.findAll = function(req, res) {
    const username = req.query.username;
    var condition = username ? {username: {$regex: new RegExp(username), $options: "i"}} : {};

    User.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ 
            message: err.message || "Some error occurred while retrieving Users." 
        });
    });
};





// Find all isActive Users
exports.findAllActive = function(req, res) {
    User.find({ isActive: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    });
};





// Find a Single User with an id
exports.findOne = function(req, res) {
    const id = req.params.id;
    User.findById(id)
    .then(data => { 
        if (!data)
            res.status(404).send({ message: "Unable to find User with id: " + id });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving User with id: " + id });
    });
};





// Update a User by the id in the request
exports.update = function(req, res) {
    if (!req.body) {
        return res.status(400).send({ 
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update User with id=${id}. User was not found!`
            });
        } else {
            res.send({ 
                message: "User was updated successfully!" 
            });
        }
    })
    .catch(err => {
        res.status(500).send({ 
            message: "Error updating User with id=" + id
        });
    });
};





// Deleta a User with the Specified id in the request
exports.delete = function(req, res) {
    const id = req.params.id;
    User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({ 
                message: `Cannot delete User with id=${id}. User was not found!`
            });
        } else {
            res.send({
                message: 'User deleted successfully!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};





// Deleta all Users from the Database
exports.deleteAll = (req, res) => {
    User.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Users was deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Users."
        });
    });
};









// *** NOTE: ***
// We don’t need to write CRUD functions, Mongoose Model supports all of them:
// create a new Tutorial: object.save()
// find a Tutorial by id: findById(id)
// retrieve all Tutorials: find()
// update a Tutorial by id: findByIdAndUpdate(id, data)
// remove a Tutorial: findByIdAndRemove(id)
// remove all Tutorials: deleteMany()
// find all Tutorials by title: find({ title: { $regex: new RegExp(title), $options: “i” } })
//
// These functions will be used in Our Controller.