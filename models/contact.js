module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
      // Giving the Contact model a name of type STRING
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          }
        });
  
        return Contact;
        } 
  

  