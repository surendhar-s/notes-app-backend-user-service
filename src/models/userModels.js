import axios from 'axios'
import userSchema from '../schemas/userSchema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 14;

export async function getuser(id) {
    return await userSchema.findOne({ email: id })
}

export async function welcomeGreeting() {
    return "Welcome greetings"
}

export async function createUser(user) {
    const data = await getuser(user.email);
    if (!data) {
        const encryptedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
        user.password = encryptedPassword
        const userDetails = await userSchema.create(user)
        return {
            success: true,
            userDetails: userDetails,
            message: "User created successfully"
        }
    }
    return {
        success: false,
        userDetails: null,
        message: "user id exists"
    }
}

export async function login(email, password) {
    const data = await getuser(email)
    if (data) {
        const isValidCredeintial = await bcrypt.compare(password, data.password)
        if (isValidCredeintial === true) {
            let token = jwt.sign({ name: data.name, userId: data._id }, 'something something something', { expiresIn: 1800 });
            return {
                success: true,
                err: null,
                token
            };
        }
        else {
            return {
                success: false,
                token: null,
                err: 'Entered Password and Hash do not match!'
            };
        }
    }
    else {
        return {
            success: false,
            token: null,
            err: 'User not found'
        };
    }
}

export async function getUserDetailsById(userId) {
    return await userSchema.findOne({ _id: userId })
}

export async function pushNotificationIntoUser(userId, dataToPush) {
    const data = await userSchema.findOne({ _id: userId })
    let notificationsList = data.notificationsList
    data.notificationsList.push(dataToPush)
    await userSchema.updateOne({ _id: userId }, { $set: { notificationsList: notificationsList } })
    return {
        success: true,
        err: null,
        message: "Notification pushed"
    }
}

export async function getNotificationByUserId(userId) {
    const data = await userSchema.findOne({ _id: userId }).select('notificationsList')
    if (!data) {
        return {
            success: true,
            notificationsList: null,
            err: "No data found"
        }
    }
    else {
        return {
            success: true,
            notificationsList: data,
            err: null
        }
    }
}

export async function markNotificationAsRead(userId, noteId) {
    const data = await userSchema.findOne({ _id: userId })
    let notificationsList = data.notificationsList
    let notificationsList1 = []
    await notificationsList.map((data1) => {
        if (data1.noteId === noteId) {
            data1.isReaded = true
        }
        notificationsList1.push(data1)
        // if (data1.noteId === noteId) {
        //     break;
        // }
    })
    const data1 = await userSchema.updateOne({ _id: userId }, { $set: { notificationsList: notificationsList1 } })
    if (data1.nModified === 1) {
        return {
            success: true,
            err: null,
            message: "Marked notification as read"
        }
    }
    else {
        return {
            success: false,
            err: "Can't mark notification as readed",
            message: null
        }
    }
}

export async function clearNotification(userId) {
    await userSchema.updateOne({ _id: userId }, { $set: { notificationsList: [] } })
}

export async function deleteNotification(userId, noteId) {
    const data = await userSchema.findOne({ _id: userId })
    let notificationsList = data.notificationsList
    let notificationsList1 = []
    await notificationsList.map((data1) => {
        if (data1.noteId !== noteId) {
            notificationsList1.push(data1)
        }
    })
    const data1 = await userSchema.updateOne({ _id: userId }, { $set: { notificationsList: notificationsList1 } })
    if (data1.nModified === 1) {
        return {
            success: true,
            err: null,
            message: "Notification deleted"
        }
    }
    else {
        return {
            success: false,
            err: "Can't delete notification",
            message: null
        }
    }
}