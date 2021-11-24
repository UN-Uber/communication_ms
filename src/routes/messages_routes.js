const express= require('express')
const router= express.Router()
const ChatSession= require('../models/chat_session')
const Message= require('../models/messages')

// Create new message in the chat session
router.post('/:id', getChat, async (req, resp)=>{
    const new_message_object= new Message({
        session: resp.chat._id,
        sender_type: req.body.sender_type,
        message: req.body.message,
        send_at: req.body.send_at
    })

    try {
        const new_message= await new_message_object.save()
        resp.status(201).json(new_message)

        resp.chat.messages.push(new_message)
        await resp.chat.save()
    } catch (err) {
        resp.status(400).json({message: err.message})
    }
})

// Middleware to get chat session by id
async function getChat(req, resp, next){
    try {
        chat= await ChatSession.findById(req.params.id)

        if (chat == null) {
            return resp.status(404).json({message: 'No se pudo hallar la sesión de chat'})
        }
    } catch (err) {
        return resp.status(500).json({message: err.message})
    }

    resp.chat= chat
    next()
}

module.exports = router
