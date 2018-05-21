var db = require('../db');
var AhoCorasick = require('node-aho-corasick');
const TITLE_QUERY = "select title from content";

var titlesTrie;
var map = {};

function initialiseTrie(done) {
    titlesTrie = new AhoCorasick();
    map = {};
    db.get().query(TITLE_QUERY, function (err, rows) {
        if(err) {
            console.error("Error in fetching titles. Error = "+ err);
            return done(err);
        }
        rows.forEach(function (movie) {
            var lowerMovie = movie.title.toLowerCase();
            map[lowerMovie] = movie.title;
            titlesTrie.add(lowerMovie);
        });
        titlesTrie.build();
        done(rows.length);
    });
}


initialiseTrie(function (d) {
   console.log("Initialising Trie. Callback returned = "+d);
});

exports.findPattern = function(textString, callbackFn) {
    var toBeSearched =  textString.toLowerCase();
    console.log("Searching text = "+ toBeSearched);
    var suggestion = titlesTrie.search(toBeSearched);
    var toReturn = [];
    suggestion.forEach(function (trieName) {
        toReturn.push(map[trieName]);
    });
    callbackFn(toReturn);
};

exports.rebuildTrie = function () {
    initialiseTrie(function (d) {
        console.log("Rebuilding Trie. Callback returned = "+d);
    });
}
