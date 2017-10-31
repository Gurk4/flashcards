const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const cards = data.cards;

router.get('/:id', function (req, res) {
    const side = req.query.side;
    const id = req.params.id;
    const text = cards[id][side];
    const hint = cards[id].hint;
    const templateData = {text, id};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.oppositeSide = 'answer';
    } else {
        templateData.oppositeSide = 'question';
    }
    res.render('cards', templateData);
});

module.exports = router;