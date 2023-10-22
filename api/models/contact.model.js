module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        name: {
            type: Sequelize.STRING,  
            allowNull: false,
 
        },
     });
     //Putting the relationship between contact and phone
      Contact.associate = (models) => {
        Contact.hasMany(models.Phone, {foreignKey: "contactId"});
    };


  
    return Contact;
};