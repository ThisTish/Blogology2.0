const { raw } = require("express")
const { where } = require("sequelize")

// WHEN I visit the site for the first time
//  THEN I am presented with the homepage, which includes existing blog posts if any have been posted; 
// todo create Blog model
// todo main.handlebars & blog.handlebars
	app.get('/', (req, res) =>{
		Blog.findAll({raw:true})
		.then((blogs) => res.render('blogs', ({blogs})))
	})
//  navigation links for the homepage and the dashboard and the option to log in
	// *make a nav partial?
	// <header>
		// <h1>BLOGOLOGY</h1>
		// <nav>
			// <ul>
				// <li>
					// <a href='/'>Home,</a>
				// </li>
				// <li>
					// {{#if loggedIn}}
					// <a href="/dashboard">Dashboard</a>
					// {{else}}
					// <a href="/login">Dashboard</a>OR prompt to sign in/sign up.
					// {{/if}}
				// </li>
				// <li>
					// {{#if loggedIn}}
					// <a href="/">Logout</a>//I'm not sure what else to do with this. as far as function goes.
					// {{else}}
					// <a href="/login">Login</a>//page or modal?
					// {{/if}}
				// </li>
				// <li>
					// {{#unless loggedIn}}
					// <a href="/signup">SignUp?</a>
					// {{/unless}}
				// </li>?
			// </ul>
		// </nav>
	// </header>
	// *add links to endpoints

//// WHEN I click on the homepage option
//// THEN I am taken to the homepage
//// WHEN I click on any other links in the navigation
//// THEN I am prompted to either sign up or sign in

// WHEN I choose to sign up 
// THEN I am prompted to create a username and password(- goes to sign up page)
router.get('/signup', (req, res) => res.render('signup'))
// todo finish creating signup.handlebars
		// *basic form
		// <form action="/signup" method = POST>
		// <label for="username">Username:</lablel>
		// <input type="text" name="username" id="blah" class="blah" placeholder="?" maxlength="25" value="{{username}}">
		//// <label for="email">Email:</lablel>
		//// <input type="text" name="email" id="blah" class="blah" placeholder="?" maxlength="25" value="{{email}}">
		// <label for="password">Password:</lablel>
		// <input type="text" name="password" id="blah" class="blah" placeholder="?" maxlength="25" value="{{password}}">
		// <input type="submit" value="sign-up" class="btn">

// WHEN I click on the sign-up button
// THEN my user credentials are saved and I am logged into the site
// todo create model for User-add hook for hashing password on create
// todo add validations and catches
	router.post('/signup', (req, res) =>{
		let {username, email, password} = req.body
		User.create({
			username,
			// email,
			password
		})
		.then((login) => res.redirect('/dashboard'))
		.catch()//todo make catch error handler(helpers)look at sequelizeTraversy practice
	})

// WHEN I revisit the site at a later time and choose to sign in
// todo make sure there is a limit on session/cookie.
// THEN I am prompted to enter my username and password
// todo create login form - login.handlbars
// todo validate & catches
	router.get('/login', (req, res) => res.render('login'))//in home-routes.js controller with if statements of if logged in, redirect('/dashboard' or '/')
// todo finish login logic
	router.post('/login', (req, res) =>{
		let {username, password} = req.body
		User.findOne({
			where:{
				username: username
				// validate password.
				//* example loggin logic in 14MVC 01-17-controllers-api-user-routes.js(andlogout)
			}
		})
	})

//// WHEN I am signed in to the site
//// THEN I see navigation links for the homepage, the dashboard, and the option to log out
//// WHEN I click on the homepage option in the navigation
//// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment  
	// todo create blog.handlbar
		// *partials
		// {{#if loggedIn}}
		// <comment form goes here action="/blog" method = POST>
		// {{else}}
		// <p>Please<a href="/login"> login </a> to leave a comment</p>
		// {{/if}}
		// {{#if comments}}
		// <render comments>
		// {{/if}}
	app.get('/blogs/:id', (req, res) =>{
		Blog.findByPk(req.params.id)
			.then((blog) => res.render('blog', {blog}))//make sure to include comment & user information
			.catch(error)
	})
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
	router.post('/blogs/:id', (req, res) =>{
		Comment.create(req.body.comment)//todo and user signed in needs to be assigned to comment
			.then((posts) =>res.render('blog', {posts}))
	})
// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
	// todo dashboard.handlbars
		// {{#if blogs}}
		// <render blog cards>
		// {{else}}
		// <p>Create your first post!</p
		// {{/if}}
		// <btn><a href="/newblog">New Blog</a></btn>
	router.get('/dashborad', (req, res) =>{
		Blog.findAll({
			where: {createdById : loggedInId}// something like this.
		})
			.then((blogs) =>{
				res.render('dashboard', {blogs})
			})
	})
// WHEN I click on the button to add a new blog post
	router.get('/newblog', (req, res) => res.render('newblog'))
// THEN I am prompted to enter both a title and contents for my blog post
	// todo newblog.handlebars
		// <blog form>
		// <input type="text" action="/newblog" method = "POST">
	router.post('/newblog', (req, res) =>{
		Blog.create(req.body)
			const post ={
			"title": req.body.title,
			"content": req.body.content,
			"author": loggedIn.username,//getting closer
			"createdOn": createdOnTimestamp
		}
		.then((post) = res.redirect('/dashboard'))
		.catch((error)=>console.log(error))
	})
//// WHEN I click on the button to create a new blog post
//// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard
// todo create editBlog.handlebars(partial?)
// fills form with values from blog selected.
router.get('/blogs/:id', (req, res)=>{
	Blog.findByPk(req.params.id)
	.then((blog)=> res.render('editBlog', {blog}))
})
// THEN I am able to delete or update my post and taken back to an updated dashboard
		router.put('/blogs/:id', (req, res) =>{
			Blog.update(req.body)
			.then((blogs)=> res.redirect('/dashboard'))
			.catch((error) => console.log(error))
		})
	router.delete('blogs/:id', async (req, res) =>{
		const blog = await Blog.findByPk(req.params.id)
		// error check
		await blog.destroy()
		res.redirect('/dashboard')
	})
	
// todo study express sessions for this.....stuff..
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
// WHEN I am idle on the site for more than a set time
// THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts