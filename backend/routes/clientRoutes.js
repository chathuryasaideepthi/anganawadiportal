import express from 'express'
import { getClientsByAww , addClient} from '../controllers/clientController.js'

const router = express.Router()

// get client assigned to a aww user
router.get('/:awwId',getClientsByAww)
router.post('/', addClient); 

export default router