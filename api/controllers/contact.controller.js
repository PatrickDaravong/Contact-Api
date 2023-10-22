const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contact ={
        name: req.body.name,
    };
    Contacts.create(contact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const Id = req.params.contactId;
    Contacts.findByPk(Id)
    .then((contact)=> {
        if(!contact){
            return res.status(404).send({message:'Contact not found'});
        }
        res.status(200).send(contact);
    })
    .catch((err)=> {
        res.status(500).send({
            message: 'Error retrieving contact with ID ='+ Id,
        });
    });
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId; 
    console.log("Received id:", id);
    const updateContact ={
        //newcontactid: req.body.contactId
    };

    Contacts.update(updateContact,{
        where: { id }
    })
    .then(num => {
        if (num === 1) {
            res.status(200).send({
                message: "Contact was updated successfully"
            });
        } else if (num === 0) {
            res.status(404).send({
                message: "Contact not found"
            });
        } else {
            res.status(500).send({
                message: 'Error updating contact'
            });
        }
    })
    .catch(err => {
        console.error("Error updating contact:", err);
        res.status(500).send({
            message: "Could not updating the contact with id = " + id
        });
    });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.contactId; 
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

