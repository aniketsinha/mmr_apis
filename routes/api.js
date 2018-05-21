var express = require('express');
var router = express.Router();
var Contents = require('../models/content');
var Pattern = require('../models/pattern');


/* GET home page. */
router.get('/get_titles', function(req, res, next) {
    var fromId = req.query.from || 1;
    var toId = req.query.to || 20;
    Contents.fetchInRange(fromId, toId, function (data) {
        return res.status(200).json(data);
    });

});

router.get('/pattern', function(req, res, next) {
    var queryText = req.query.q || "";
    Pattern.findPattern(queryText, function (data) {
        return res.status(200).json(data);
    });

});

router.put('/trie_fir_se_banao', function (req, res, next) {
   console.log("Rebuilding trie");
   Pattern.rebuildTrie();
});


module.exports = router;
