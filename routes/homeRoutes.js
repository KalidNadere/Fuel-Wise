const router = require('express').Router();

router.get('/',async (req,res) => {
    try{
        console.log('Render homepage')
        const logged_in = req.session.logged_in || false;
        res.render('dashboard', { logged_in }); 
    }catch{
        console.log("didnt render")
    }
    
})

router.get('/login', async (req,res) => {
    res.render('login')
})

router.get('/signup',async (req,res) => {
    res.render('signup')
})

module.exports = router;