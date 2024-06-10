const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const sequelize = require('./config/connection')
const colors = require('colors')
const { Blog } = require('./models')
const blogRouter = require('./controllers/api/blogRoute')

async function connectToDB(){
	try {
		await sequelize.authenticate()
		console.log(`Connected to the database!`.cyan)

		await sequelize.sync({ alter: false })
		console.log(`Database & tables synced!`.blue)
	} catch (err) {
		console.log(`Trouble connecting to database: ${err}`.red)
	}
}
connectToDB()

const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json())
// using the qs library for parsing html forms
app.use(express.urlencoded({ extended: true })) 

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/blog', blogRouter)


app.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll()
		if(!blogs){
			return res.status(404).json({message: 'No blogs found'})
			return
		}
		// res.json(blogs)		
		res.render('homepage' , {blogs})
	} catch (error) {
		console.log(`Trouble getting blogs: ${error}`.red)
	}
})

app.listen(PORT, () => console.log(`http://localhost:${PORT} will be your server today. Enjoy!`.magenta))
