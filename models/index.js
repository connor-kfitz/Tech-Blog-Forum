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

Comments.belongsTo(Posts, {
    foreignKey: 'postID'
});

module.exports = { User, Posts, Comments };