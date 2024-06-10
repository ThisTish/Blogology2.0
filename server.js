const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')

const sequelize = require('./config/connection')
const sequelizeStore = require('connect-session-sequelize')(session.Store)
const helpers = require('./utils/helpers')
const colors = require('colors')
const routes = require('./controllers')
// const { Store } = require('express-session')


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

// const sess = {
// 	secret:"Sshhhhh, it's a secret!",
// 	cookie:{
// 		maxAge: 300000,
// 		httpOnly: true,
// 		secure: false,
// 		sameSite: "strict"
// 	},
// 	resave: false,
// 	saveUninitialized: true,
// 	store: new sequelizeStore({
// 		db: sequelize
// 	})
// }

// app.use(session(sess))

const hbs = exphbs.create({helpers})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

app.get('/sessions', async (req, res) => {
	const sessions = await sequelize.models.Session.findAll()
	res.json(sessions)
})

app.listen(PORT, () => console.log(`http://localhost:${PORT} will be your server today. Enjoy!`.magenta))
