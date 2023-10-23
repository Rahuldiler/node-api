const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique: true,
        required: true
    },
    driver_type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact_number: {
        type: String,
        validate: {
            validator: function (value)
            {
                return validator.isMobilePhone(value, 'any', { strictMode: false });
            },
            message: 'Invalid phone number format'
        }
    },
    dob: {
        type: Date,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
});

userSchema.methods.generateAuthToken = async function ()
{
    try
    {
        const token = jwt.sign({ _id: this._id }, "myselfrahuldilerbelongtoharyanaprofessioninreactdevelopement");
        this.tokens = this.tokens.concat({token:token})
        return token
    } catch (error)
    {
        res.send(error)
        console.log(error);
    }
}

userSchema.pre("save", async function (next)
{
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users