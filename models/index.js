// bring in all models and assign associations
// *example
// const Model = require('./Model')
// todo
// Blogs have many comments....
// Users have many blogs...
// Users have many comments...
// *partial
// module.exports = {
// 	Model, Blog, User, Comment
// }

//* Blog, Comment, User models made

// onDelete: CASCADE -when user deleted blog deleted & when blog deleted related to comment