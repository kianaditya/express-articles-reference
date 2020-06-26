'use strict'
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false,
      },
      encryptedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  )
  User.associate = function (models) {
    User.hasMany(models.Post, { as: 'author', foreignKey: 'AuthorId' })
  }
  User.beforeCreate(async function (user, options) {
    const password = await cryptPassword(user.encryptedPassword)
    user.encryptedPassword = password
  })

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.encryptedPassword)
  }

  function cryptPassword(password) {
    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return reject(err)
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return reject(err)
          return resolve(hash)
        })
      })
    })
  }
  return User
}
