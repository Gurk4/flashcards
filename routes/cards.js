const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const cards = data.cards;

router.get('/', function(req, res){
    const id = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${id}?side=question`);
});

router.get('/:id', function (req, res) {
    const side = req.query.side || 'question';
    const id = req.params.id;
    const text = cards[id][side];
    const hint = cards[id].hint;
    const name = req.cookies.username;
    const templateData = {text, id, name, side};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.oppositeSide = 'answer';
    } else {
        templateData.oppositeSide = 'question';
    }
    res.render('card', templateData);
});

module.exports = router;