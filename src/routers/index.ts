import { Router } from 'express'
import { linkController, viewController } from '../controllers'

const router = Router()

router.get('/:shortcut', linkController.redirect)

router.post('/', linkController.create)
router.get('/', viewController.renderMainPage)

export default router
