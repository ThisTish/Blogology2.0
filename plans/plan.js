// ideas, jquery
// ideas tailwind
// ideas login sign up modal


// todo isAuthenticated is commented out everywhere. will place back in to places if needed. causing to many changes to session
// todo pass logged_in anytime rendering?
// todo combine login/signup page.-easier when first trying to get to dashboard when not logged in
// todo make blog cards partial so dashboard and homepage show same.-dashboard not showing content
// todo homepage only needs blog title and date created
	//* todo, if i make accordion, then add 'add comment as an option and redirect to blog/:id page
//*format date cool?

//! WHEN I visit the site for the first time
//! THEN I am presented with the homepage, which includes existing blog posts if any have been posted; 
// todo what to do if there aren't any. 
// // create Blog model
////	// homepageRoute
////	// app.get('/', (req, res) =>{
////	// 	Blog.findAll({raw:true})
////	// 	.then((blogs) => res.render('blogs', ({blogs})))
////	// })
////	//  main.handlebars & blog.handlebars

////  navigation links for the homepage and the dashboard and the option to log in
//	// <header>
//	// 	<h1>BLOGOLOGY</h1>
//	// 	<nav>
//	// 		<ul>
//	// 			<li>
//	// 				<a href='/'>Home,</a>
//	// 			</li>
//	// 			<li>
//	// 				{{#if loggedIn}}
//	// 				<a href="/dashboard">Dashboard</a>
//	// 				{{else}}
//	// 				<a href="/login">Dashboard</a>OR prompt to sign in/sign up.
//	// 				{{/if}}
//	// 			</li>
//	// 			<li>
//	// 				{{#if loggedIn}}
//	// 				<a href="/">Logout</a>//I'm not sure what else to do with this. as far as function goes.
//	// 				{{else}}
//	// 				<a href="/login">Login</a>//page or modal?
//	// 				{{/if}}
//	// 			</li>
//	// 			<li>
//	// 				{{#unless loggedIn}}
//	// 				<a href="/signup">SignUp?</a>
//	// 				{{/unless}}
//	// 			</li>?
//	// 		</ul>
//	// 	</nav>
//	// </header>
	// //add links to endpoints

//! WHEN I click on the homepage option
// !THEN I am taken to the homepage

//!WHEN I click on any other links in the navigation
//! THEN I am prompted to either sign up or sign in
// todo isAuth added to routes to get dashboard & such

// !WHEN I choose to sign up 
//! THEN I am prompted to create a username and password
// TODO  make modal ? 
	// *or new page? new page right now
// // create signup submit function
////finish creating signup.handlebars
	//	//basic form
	//	// <form action="/signup" method = POST>
	//	// <label for="username">Username:</lablel>
	//	// <input type="text" name="username" id="blah" class="blah" placeholder="?" maxlength="25" value="{{username}}">
		//// <label for="email">Email:</lablel>
		//// <input type="text" name="email" id="blah" class="blah" placeholder="?" maxlength="25" value="{{email}}">
	//	// <label for="password">Password:</lablel>
	//	// <input type="text" name="password" id="blah" class="blah" placeholder="?" maxlength="25" value="{{password}}">
	//	// <input type="submit" value="sign-up" class="btn">

//!WHEN I click on the sign-up button
//!THEN my user credentials are saved and I am logged into the site
	// // *signUpRoute-turn async?
//	// router.post('/', (req, res) =>{
//	// 	let {username, password} = req.body
//	// 	User.create({
//	// 		username,
//	// 		password
//	// 	})
//	// 	.then((login) => res.redirect('/dashboard'))
//		// .catch()
//	// })
////  create model for User-add hook to modal for hashing password on create
////  add validations and catches

//! WHEN I revisit the site at a later time and choose to sign in
//! THEN I am prompted to enter my username and password
// // create login submit function
// // test by changing the time on the cookie
//  //make sure there is a limit on session/cookie.
////  create login form - login.handlbars
	//// router.get('/login', (req, res) => res.render('login'))//in home-routes.js controller with if statements of if logged in, redirect('/dashboard' or '/')
// // finish login logic for loginRoute
	// //router.post('/login', (req, res) =>{
	// 	//let {username, password} = req.body
	// 	//User.findOne({
	// 	//	where:{
	// 	//		username: username
	// 			// validate password.
	// 			// example loggin logic in 14MVC 01-17-controllers-api-user-routes.js(andlogout)
	// 	//	}
	// 	//})
	// //})

//!WHEN I am signed in to the site
//! THEN I see navigation links for the homepage, the dashboard, and the option to log out
// todo {{#if logged_in}} on homepage
//// WHEN I click on the homepage option in the navigation
//// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
//! WHEN I click on an existing blog post
//! THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment  
//? accordion?
	// *goes to new page for now.
	////  create blog.handlbar
//		// partials
//		// {{#if loggedIn}}
//		// <comment form goes here action="/blog" method = POST>
//		// {{else}}
//		// <p>Please<a href="/login"> login </a> to leave a comment</p>
//		// {{/if}}
//		// {{#if comments}}
//		// <render comments>
//		// {{/if}}
	////  get postRoute
	//// app.get('/blogs/:id', (req, res) =>{
	// 	//Blog.findByPk(req.params.id)
	// 	//	.then((blog) => res.render('blog', {blog}))//make sure to include comment & user information
	// 	//	.catch(error)
	//// })


//! WHEN I enter a comment and click on the submit button while signed in
//! THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
	// // create comment form & handlebars
	// // create function to handle submit(add & post comment)
//// router.post('/blogs/:id', (req, res) =>{
//	// 	Comment.create({
//	// 		text: req.body.text,
//	// 		username: getUsername(session.user.name),//???
//	// 		date: new Date(format_date(now))
	// 		// todo make format_date helper
//	// 	})
//	// 		.then((posts) =>res.render('blog', {posts}))
//	// 		.catch(error => console.log(error))
//	// })

//! WHEN I click on the dashboard option in the navigation
//! THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
////  get dashboardRoute
//// router.get('/dashborad', (req, res) =>{
//// 	Blog.findAll({
//// 		where: {createdById : loggedInId}
//// 	})
//// 		.then((blogs) =>{
//// 			res.render('dashboard', {blogs})
//// 		})
//// 		.catch(error => console.log(error))
//// })
	// // dashboard.handlbars
	//	// {{#if loggedIn}}
	//	// {{#if blogs}}
	//	// <render blog cards>
	//	// {{else}}
	//	// <p>Create your first post!</p
	//	// {{/if}}
	//	// <btn><a href="/newblog">New Blog</a></btn>
	//	// {{/if}}
//! WHEN I click on the button to add a new blog post
//! THEN I am prompted to enter both a title and contents for my blog post
//  //render newblog.handlebars
//// router.get('/newblog', (req, res) => res.render('newblog'))
	// // newblog.handlebars
	// // newBlog form & handlebars
	// // function for submit
	//	//partially done
	//	// <blog form>
	//	// <input type="text" action="/newblog" method = "POST">
	// //  post newBlogRoute
	//// router.post('/newblog', (req, res) =>{
	//// 	Blog.create(req.body)
	//// 		const post ={
	//// 		"title": req.body.title,
	//// 		"content": req.body.content,
	//// 		"author": loggedIn.username,//getting closer
	// 		// session.username?
	//// 		"createdOn": createdOnTimestamp
	//// 	}
	//// 	.then((post) = res.redirect('/dashboard'))
	//// 	.catch((error)=>console.log(error))
	//// })
//// WHEN I click on the button to create a new blog post
//// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
//! WHEN I click on one of my existing posts in the dashboard
//! fills form with values from blog selected.
// tried:couldn't  create edit create blog form with "if statements" for inputs to be filled (value = {{info}}) & buttons (edit, cancel, delete)
// // edit blog route
//// router.get('/blogs/:id', (req, res)=>{
//// 	Blog.findByPk(req.params.id)
//// 	.then((blog)=> res.render('editBlog', {blog}))
//// })
//// THEN I am able to delete or update my post and taken back to an updated dashboard
//	// 	router.put('/blogs/:id', (req, res) =>{
//	// 		Blog.update(req.body)
//	// 		.then((blogs)=> res.redirect('/dashboard'))
//	// 		.catch((error) => console.log(error))
//	// 	})
//	// router.delete('blogs/:id', async (req, res) =>{
//	// 	const blog = await Blog.findByPk(req.params.id)
	// 	// error check
//	// 	await blog.destroy()
//	// 	res.redirect('/dashboard')
//	// })
	
////  study express sessions for this.....stuff..
// //WHEN I click on the logout option in the navigation
// //THEN I am signed out of the site
//! WHEN I am idle on the site for more than a set time
//! THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
//todo add {{#if logged in's and isAuth}}

// *ROUTES/ENDPOINTS TO MAKE
//? generalize into groups?
// '/'
// '/signup'
// '/login'
// '/blogs'
//'/dashboard'
//'/newBlog'
//'/comment'


// *MODELS TO MAKE
// Blog,
// Comment,
// User
// User hasMany Blog
// User hasMany Comment
// Blog hasMany Comment

// // research more to see what goes where.
// HANDLEBARS TO MAKE
// main.handlebars
	// //PARTIALS
	// comment-details.handlebars--goes in blog(& maybe edit blog)
	// blog-form.handlebars -- used for new post & editing
	// user-form.handlebars -- used for login / sign up
	// blog-details.handlbars -- used for homepage & blog
	// blog-headers.handlbars -- used in dashboard
	// comment-form -- used in blog

	// *SUBLAYOUTS
//   idea dashboard.handlebars//?how would you make another layout if you wanted another skeleton for this?
//   blogs.handlebars--for each blog of blogs >blog-details
//   signup.handlebars-- >user-form (buttons based on endpoint?)
//   login.handlebars--  >user-form (buttons based on endpoint?)
//   blog.handlebars-- >blog-details(once) & >comment-details & >comment-form//?maybe make a button to add comment?
//    newBlog.handlebars-- >blog-form(empty with create buttons)
//    editBlog.handlebars-- >blog-form(filled with values and with edit/cancel/delete buttons)
	// *HELPERS


// *js
	// todo submit login
	// todo submit logout
	// todo submit signup
	// todo submit comment
	// todo submit newBlog
	// todo submit editBlog

// 1. Get database & tables set up
// 2. sync sequelize and server
// 3. Work on routes by testing by action
// 4. Work on handlebars rendering
// 5. design

// *remember to serialize-.get({plain:true}) lesson 7
	// sequelize documentation

// render two projects. one for database, one for front end
