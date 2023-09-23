const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            minLength: [2, "First name must be at least 2 characters"],
            maxLength: [20, "First name must be 20 characters at most"],
            required: [true, "Enter first name"],
        },
        lastName: {
            type: String,
            trim: true,
            minLength: [2, "Last name must be at least 2 characters"],
            maxLength: [20, "Last name must be 20 characters at most"],
            required: [true, "Enter Last name"],
        },
        phone: {
            type: Number,
            min: [100000000, 'Invalid Phone Number'],
            max: [999999999, 'Invalid Phone Number'],
            required: [true, 'Enter Phone Number'],
            unique: true,
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Enter Email"],
            unique: true,
        },
        password: {
            type: String,
            min: [8, 'Min 8 characters'],
            max: [16, 'Max 16 characters'],
            required: [true, "Enter Password"],
        }
    })

userSchema.statics.register = async function(firstName, lastName, phone, email, password, confirmPassword) {
    //Validation
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isMobilePhone(phone.toString() , 'uz-UZ')) {
        throw Error('Phone number is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    if(password !== confirmPassword) {
        throw Error('Passwords do not match')
    }


    const emailExists = await this.findOne({email})
    const phoneExists = await this.findOne({phone})

    if (emailExists || phoneExists) {
        throw Error("Email or Phone Number is already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return await this.create({firstName, lastName, phone, email, password: hash})
}

userSchema.statics.login = async function(email, password){
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('This email is not registered')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)