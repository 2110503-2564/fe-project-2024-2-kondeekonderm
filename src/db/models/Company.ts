import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province'],
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postal Code can not be more than 5 digits']
    },
    website: {
        type: String,
        required: [true, 'Please add a website URL'],
        match: [
            /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
            'Please add a valid website URL'
        ]
    },
    description: {
        type: String,
        required: [true, 'Please add description'],
        maxlength: [500,'descriptino should be under 500 letter']
    },

    tel: {
        type: String,
    },
});


const Company = mongoose.models.Company || mongoose.model("Car", CompanySchema)
export default Company