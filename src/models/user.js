'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {}
  )
  User.associate = function (models) {
    User.hasMany(models.Post, { as: 'author', foreignKey: 'AuthorId' })
  }
  return User
}
