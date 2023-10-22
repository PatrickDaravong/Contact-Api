const db = require("../models");
const contactModel = require("../models/contact.model");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const phone ={
        id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        contactId: req.body.contactId,
    };

    Phones.create(phone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
    
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
    
  
};

// Update one phone by id
exports.update = (req, res) => {
    
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.id; // Use 'contactId' instead of 'id'
    console.log("Received id:", id);
    Contacts.destroy({
        where: { id }
    })
    .then(num => {
        if (num === 1) {
            res.status(200).send({
                message: "Contact was deleted successfully"
            });
        } else if (num === 0) {
            res.status(404).send({
                message: "Contact not found"
            });
        } else {
            res.status(500).send({
                message: 'Error deleting contact'
            });
        }
    })
    .catch(err => {
        console.error("Error deleting contact:", err);
        res.status(500).send({
            message: "Could not delete the contact with id = " + id
        });
    });
};
