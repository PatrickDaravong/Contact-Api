const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    Contacts.count()
    .then((numberOfContacts) => {
      Phones.count()
        .then((numberOfPhoneNumbers) => {
          Contacts.findOne({
            order: [['createdAt', 'DESC']]
          }).then((mostRecentContact) => {
            Contacts.findOne({
              order: [['createdAt', 'ASC']]
            }).then((oldestContact) => {
              // Create a JSON response object
              const statsData = {
                numberOfContacts,
                numberOfPhoneNumbers,
                mostRecentContact,
                oldestContact,
              };

              // Respond with the JSON object
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