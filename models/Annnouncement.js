const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema({ //Announcement Schema


    announcementTitle: {
        type: String
    },
    announcementDescription: {
        type: String
    },
    announcementDate: {
        type: String
    },
    announcementTime: {
        type: String
    },
    announcementDeadline:{
        type: String
    }
})
const Announcement = mongoose.model("announcements", AnnouncementSchema)
module.exports = Announcement