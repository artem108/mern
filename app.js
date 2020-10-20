const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use('/api/auth', require('./routes/auth.routes'))
const PORT = config.get('port') || 5000

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
