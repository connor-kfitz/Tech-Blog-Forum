const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

User.hasMany(Comments, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
    foreignKey: 'userID'
});

Posts.hasMany(Comments, {
    foreignKey: 'postID',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'userID'
});

module.exports = { User, Posts, Comments };