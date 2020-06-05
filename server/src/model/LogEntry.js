const mongoose = require('mongoose');

//const { Schema } = mongoose;

const logEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 1
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    visitDate: {
        required: true,
        type: Date
    }

}, {timestamps: true});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;