const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    Contacts.count()
    .then((numberContacts) => {
      Phones.count()
        .then((numberPhoneNumbers) => {
            //we can use our other functions to find the specific contacts -> FIRST AND LAST 
          Contacts.findOne({
            order: [['createdAt', 'DESC']]
          }).then((mostRecentContact) => {
            Contacts.findOne({
              order: [['createdAt', 'ASC']]
            }).then((oldestContact) => {
              const statsData = {
                numberContacts,
                numberPhoneNumbers,
                mostRecentContact,
                oldestContact,
              };

              res.status(200).json(statsData);
            });
          });
        })
        .catch((error) => {
          console.error('Error fetching number of phone numbers:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })
    .catch((error) => {
      console.error('Error fetching number of contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};