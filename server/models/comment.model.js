const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    postId: {
        ref: 'posts',
        type: Schema.Types.ObjectId
    }
})

module.exports = model('comments', commentSchema)