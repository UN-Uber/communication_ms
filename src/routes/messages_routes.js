const express= require('express')
const router= express.Router()
const message= require('../models/messages')

// Get all the chat messages by chat session id

// Create new message in the chat session

// Middleware to get chat session by id
async function getMessage(req, resp, next){
    try {
        messages= await message.collection.find({session_id: req.body.id})

        if (messages == null) {
            return resp.status(404).json({message: 'No se pudo hallar la sesión de chat'})
        }
    } catch (err) {
        return resp.status(500).json({message: err.message})
    }

    resp.chat= chat
    next()
}

module.exports = router
