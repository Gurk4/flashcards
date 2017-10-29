const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
// const pug = require('pug');
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

app.set('view engine', 'pug');

app.get('/', function(req, res){
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
});

app.get('/hello', function(req, res){
    const name = req.cookies.username;
    if (name) {
        res.redirect('/')
    } else {
        res.render('hello');
    }
});

app.post('/hello', function(req, res){
    res.cookie('username', req.body.username);
    res.redirect('/hello');
});

app.post('/goodbye', function(req, res){
    res.clearCookie('username');
    res.redirect('/hello');
});

app.get('/cards', function (req, res) {
    // res.locals.prompt = "Who let the dogs out?";
    res.render('cards', {prompt: 'Who is buried in Grant\'s tomb?',
    hint: 'think about whose tomb it is',
    colors: colors});
})

app.listen(3000, function(){
    console.log('server listening on port 3000');
});