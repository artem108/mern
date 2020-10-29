const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENW === 'production')  {
    app.use('/', express.static(patch.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {

    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`))
    } catch (err) {
        console.log(`Server error: ${err.massage}`)
        process.exit(1)
    }
}

start()
