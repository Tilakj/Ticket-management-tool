const express = require('express')
const setupDB = require('./config/database')
const routes = require('./config/routes')
const app = express()
const autheticateUser = require('./app/middlewares/authentication')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const PORT = 3033
const cors = require('cors')

const options = {
    definition: {
        info: {
            title: 'Ticket Master', // Title (required)
            description: 'APIs for Ticket Master',
            version: '1.0.0', // Version (required)
            servers: ['http://localhost:3000/']
        },
    },
    apis: ['./config/routes.js'],
};

const swaggerDocs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors())
app.use(express.json())
app.use(autheticateUser)

app.use('/', routes)


setupDB()

app.get('/', (req, res) => {
    res.redirect('http://localhost:'+PORT+'/api-docs');
    // res.json({ title: 'Welcome to Ticket Master' })
})

app.listen(PORT, () => {
    console.log('listining at port ' + PORT)
})