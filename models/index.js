const Blog = require('./Model')
const Comment = require('./Model')
const User = require('./Model')

User.hasMany(Blog,{
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
})

Blog.hasMany(Comment,{
	foreignKey: 'blog_id',
	onDelete: 'CASCADE'
})

Blog.belongsTo(User, {
	foreignKey: 'user_id',	
})

Comment.belongsTo(Blog, {
	foreignKey: 'blog_id',	
})

module.exports = { Model, Blog, User, Comment }
