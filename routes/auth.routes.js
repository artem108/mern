const {Router} = require('express')
const bcryptjs = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')

const router = Router()

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password to short, should be as minimum 6 symbols').isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Wrong data for registration'
                })
            }
            const { email, password } = req.body
            const candidate = await User.findOne({ email })


            if(candidate) {
                res.status(400).json({massage: 'User allready exist :('})
            }

            const hashedPassword = await bcryptjs.hash(password, 12)
            const user = new User({ email, password: hashedPassword})

            await user.save()

            res.status(201).json({massage: 'User created :)'})
            
        } catch (err) {
            res.status(500).json({massage: 'Something went wrong :('})
        }
})

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Email is not correct').normalizeEmail().isEmail(),
        check('password', 'Entar password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Wrong data for log in'
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({ email })


            if(!user) {
                res.status(400).json({massage: "User doen't exist :("})
            }

            const isMatched = await bcryptjs.compare(password, user.password)

            if(!isMatched) {
                return res.status(400).json({massage: 'Wrong password ;('})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
  
            
        } catch (err) {
            res.status(500).json({massage: 'Something went wrong :('})
        }
})

module.exports = router