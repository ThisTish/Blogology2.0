const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const sequelize = require('./config/connection')
const colors = require('colors')
const routes = require('./controllers')


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


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)


app.listen(PORT, () => console.log(`http://localhost:${PORT} will be your server today. Enjoy!`.magenta))
