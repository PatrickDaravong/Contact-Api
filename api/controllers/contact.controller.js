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
    const Id = req.params.id;
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
};


// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.id
    Contacts.destroy({
        where: {id:id}
    })
    .then(num => {
        if (num == 1){
            res.send({
                message: "Contact was deleted successfully"
            });
        } else {
            res.send({
                message: 'Cannot delete contact'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete the contact with id ="+id
        })
    })
};
