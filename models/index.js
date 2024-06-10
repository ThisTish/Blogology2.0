const Blog = require('./Blog')
const Comment = require('./Comment')
const User = require('./User')

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

module.exports = { Blog, User, Comment }
