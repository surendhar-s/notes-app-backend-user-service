import * as userService from '../services/userService'

export async function welcomeGreeting(req, res, next) {
    const data = await userService.welcomeGreeting()
    res.json({ message: data })
}

export async function createUser(req, res, next) {
    try {
        const data = await userService.createUser(req.body);
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    try {
        const data = await userService.login(email, password)
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function checkUserEmail(req, res, next) {
    const email = req.params.email
    try {
        const data = await userService.getuser(email)
        if (data) {
            res.json({ message: { success: true, userId: data._id } })
        }
        else {
            res.json({ message: { success: false, userId: null } })
        }
    }
    catch (err) {
        next(err)
    }
}

export async function checkRoute(req, res, next) {
    res.json({ message: "Message from secrued route" })
}

export async function getUserDetailsById(req, res, next) {
    const userId = req.params.userId
    try {
        const data = await userService.getUserDetailsById(userId)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}

export async function pushNotificationIntoUser(req, res, next) {
    const userId = req.body.userId
    const notificationTitle = req.body.notificationTitle
    const noteId = req.body.noteId
    const dataToPush = {
        notificationTitle: notificationTitle,
        noteId: noteId,
        isReaded: false,
        dateShared: Date.now()
    }
    try {
        const data = await userService.pushNotificationIntoUser(userId, dataToPush)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}

export async function getNotificationByUserId(req, res, next) {
    const userId = req.params.userId
    try {
        const data = await userService.getNotificationByUserId(userId)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}

export async function markNotificationAsRead(req, res, next) {
    const noteId = req.body.noteId
    const userId = req.body.userId
    try {
        const data = await userService.markNotificationAsRead(userId, noteId)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}

export async function clearNotification(req, res, next) {
    const userId = req.params.userId
    try {
        const data = await userService.clearNotification(userId)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}

export async function deleteNotification(req, res, next) {
    const noteId = req.body.noteId
    const userId = req.body.userId
    try {
        const data = await userService.deleteNotification(userId, noteId)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}