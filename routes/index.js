const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', function(req, res){
    const name = req.cookies.username;
    if (name) {
        res.redirect('/')
    } else {
        res.render('hello');
    }
});

router.post('/hello', function(req, res){
    res.cookie('username', req.body.username);
    res.redirect('/hello');
});

router.post('/goodbye', function(req, res){
    res.clearCookie('username');
    res.redirect('/hello');
});


module.exports = router;