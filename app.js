const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// Set path to .env file
dotenv.config({ path: './.env' });

const app = express()

// mongo db connection
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
mongoose.connect(connectionString)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// morgan used for logging.
app.use(morgan('dev'))

// routing
app.get('/', (req, res) => {
   res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About"})
})

// blog routes
app.use('/blogs', blogRoutes);

// error handling with middleware
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})
