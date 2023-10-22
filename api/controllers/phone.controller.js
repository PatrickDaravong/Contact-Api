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
    const Id = req.params.phoneId;
    Phones.findByPk(Id)
    .then((phone)=> {
        if(!phone){
            return res.status(404).send({message:'Phone not found'});
        }
        res.status(200).send(phone);
    })
    .catch((err)=> {
        res.status(500).send({
            message: 'Error retrieving Phone with ID ='+ Id,
        });
    });
};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.phoneId; 
    const contactId = req.params.contactId
    console.log("Received contactId",contactId)
    console.log("Received id:", id);
    
    const updatePhone ={
        //newPhoneid: req.body.phoneId
    };

    Phones.update(updatePhone,{
        where: { id,
            contactId},
    })
    .then(num => {
        if (num === 1) {
            res.status(200).send({
                message: "Phone was updated successfully"
            });
        } else if (num === 0) {
            res.status(404).send({
                message: "Phone not found"
            });
        } else {
            res.status(500).send({
                message: 'Error deleting Phone'
            });
        }
    })
    .catch(err => {
        console.error("Error update Phone:", err);
        res.status(500).send({
            message: "Could not update the Phone with id = " + id
        });
    });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId; 
    const contactId = req.params.contactId
    console.log("Received contactId",contactId)
    console.log("Received id:", id);
    Phones.destroy({
        where: { id,
            contactId},
    })
    .then(num => {
        if (num === 1) {
            res.status(200).send({
                message: "Phone was deleted successfully"
            });
        } else if (num === 0) {
            res.status(404).send({
                message: "Phone not found"
            });
        } else {
            res.status(500).send({
                message: 'Error deleting contact'
            });
        }
    })
    .catch(err => {
        console.error("Error deleting Phone:", err);
        res.status(500).send({
            message: "Could not delete the Phone with id = " + id
        });
    });
};
