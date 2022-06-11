import mongoose from 'mongoose'
import * as userService from '../services/userService'
import Joi from 'joi'
import validate from '../utils/validate'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: Number, required: false, default: 0 },
    email: { type: String, required: true, createIndexs: { unique: true } },
    notes: { type: String, required: false },
    notificationsList: { type: [], required: false }
    // notificationsList: {
    //     notificationTitle: {
    //         type: String,
    //         required: false
    //     },
    //     noteId: {
    //         type: String,
    //         required: false
    //     },
    //     isReaded: {
    //         type: Boolean,
    //         default: false
    //     },
    //     dateShared: {
    //         type: Date,
    //         required: false
    //     }
    // }
})

const schemaValidation = {
    name: Joi.string().required(),
    password: Joi.string().min(5).max(15).required(),
    contactNumber: Joi.number().integer().min(1000000000).max(9999999999),
    email: Joi.string().email().required(),
}

function userValidator(req, res, next) {
    return validate(req.body, schemaValidation)
        .then(() => next())
        .catch(err => next(err));
}

function findUser(req, res, next) {
    return userService
        .getUser(req.params.email)
        .then(() => next())
        .catch(err => next(err));
}
export { userValidator, findUser }
export default mongoose.model('userDB', userSchema)