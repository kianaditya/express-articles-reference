'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SavedPosts', {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SavedPosts')
  },
}
