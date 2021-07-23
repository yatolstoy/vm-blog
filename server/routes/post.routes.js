const passport = require('passport')
const { Router } = require('express')

const upload = require('../middleware/upload')
const crt = require('../controllers/post.controller')

const router = Router()


// Admin
// /api/post/admin
router.post(
    '/admin/',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    crt.create
)

router.get(
    '/admin/',
    passport.authenticate('jwt', { session: false }),
    crt.getAll
)

router.get(
    '/admin/:id',
    passport.authenticate('jwt', { session: false }),
    crt.getById
)

router.put(
    '/admin/:id',
    passport.authenticate('jwt', { session: false }),
    crt.update
)

router.delete(
    '/admin/:id',
    passport.authenticate('jwt', { session: false }),
    crt.remove
)

//Base
// /api/post/admin

router.get('/', crt.getAll)
router.get('/:id', crt.getById)
router.put('/add/view/:id', crt.addView)

module.exports = router