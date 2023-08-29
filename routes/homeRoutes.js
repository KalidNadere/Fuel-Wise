const router = require('express').Router();

router.get('/',async (req,res) => {
    try{
        console.log('Render homepage')
        res.render('dashboard');
    }catch{
        console.log("didnt render")
    }
    
})

router.get('/login', async (req,res) => {
    res.render('login')
})

module.exports = router;