const User = require('./User');
const Posts = require('./Posts');

User.hasMany(Posts, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
    foreignKey: 'userID'
});

module.exports = { User, Posts };