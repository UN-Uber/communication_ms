require('dotenv').config()

const express= require('express')
const app= express()
const mongoose= require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db= mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json())

const chatsRouter= require('./src/routes/chat_sessions_routes')
const messagesRouter= require('./src/routes/messages_routes')
app.use('/communications/chat', chatsRouter)
app.use('/communications/message', messagesRouter)

app.listen(3000, ()=> console.log('Server Started'))
