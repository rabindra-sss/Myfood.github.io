import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "company name is required"]
    },
    position: {
        type: String,
        required: [true, "position is required"]
    },
    status: {
        type: String,
        enum: ["pending", "reject", "interview"],
        default: "pending"
    },
    worktype: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"],
        default: "full-time"
    },
    joblocation: {
        type: String,
        default: "Mumbai"
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})

export default mongoose.model('Job', jobSchema);