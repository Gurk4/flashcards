const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
// const pug = require('pug');
const app = express();

app.set('view engine', 'pug');

app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use(function(req, res, next){
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use(function(err, req, res, next){
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, function(){
    console.log('server listening on port 3000');
});