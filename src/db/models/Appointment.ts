import mongoose from "mongoose";

const AppointmentSchema=new mongoose.Schema({
    apptDate: {
        type: Date,
        required: true
    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema)
export default Appointment