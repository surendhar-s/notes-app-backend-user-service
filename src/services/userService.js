import * as userModel from '../models/userModels'

export async function getuser(id) {
    return userModel.getuser(id)
}

export async function welcomeGreeting() {
    return userModel.welcomeGreeting();
}

export async function createUser(user) {
    return userModel.createUser(user);
}

export async function login(email, password) {
    return await userModel.login(email, password);
}

export async function getUserDetailsById(userId) {
    return await userModel.getUserDetailsById(userId)
}

export async function pushNotificationIntoUser(userId, dataToPush) {
    return await userModel.pushNotificationIntoUser(userId, dataToPush)
}

export async function getNotificationByUserId(userId) {
    return await userModel.getNotificationByUserId(userId)
}

export async function markNotificationAsRead(userId, noteId) {
    return await userModel.markNotificationAsRead(userId, noteId)
}

export async function clearNotification(userId) {
    return await userModel.clearNotification(userId)
}

export async function deleteNotification(userId, noteId) {
    return await userModel.deleteNotification(userId, noteId)
}