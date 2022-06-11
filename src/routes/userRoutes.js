import Router from 'express'
import * as userController from '../controllers/userController'
import exjwt from 'express-jwt';
import { userValidator } from '../schemas/userSchema'

const jwtMW = exjwt({
    secret: 'something something something'
});

const router = Router()

router.get('/', userController.welcomeGreeting)

router.post('/createUser', userValidator, userController.createUser)

router.post('/login', userController.login)

router.get('/checkUserEmail/:email', userController.checkUserEmail)

router.get('/checkRoute', jwtMW, userController.checkRoute)

router.get('/getUserDetailsById/:userId', jwtMW, userController.getUserDetailsById)

router.post('/pushNotificationIntoUser', jwtMW, userController.pushNotificationIntoUser)

router.get('/getNotificationByUserId/:userId', jwtMW, userController.getNotificationByUserId)

router.post('/markNotificationAsRead', jwtMW, userController.markNotificationAsRead)

router.get('/clearNotification/:userId', jwtMW, userController.clearNotification)

router.post('/deleteNotification/', jwtMW, userController.deleteNotification)

export default router;