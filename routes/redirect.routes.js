const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.click + 1
            await link.save()
            return res.redirect(link.from)
        } 

        res.status(404).json('Link not found :(')        
    } catch (err) {
        res.status(500).json({massage: 'Something went wrong :('})
    }
})

module.exports = router