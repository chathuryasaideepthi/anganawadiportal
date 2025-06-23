import express from 'express'
import {getUser,addUser} from '../controllers/awwController.js'

const router = express.Router()

router.get('/', getUser);       // Get all AWWs
router.post('/', addUser);       // Add a new AWW

export default router 
