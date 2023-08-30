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
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;