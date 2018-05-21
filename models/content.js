var db = require('../db')

const FETCH_QUERY = "SELECT * from content";
const NETFLIX_URL_PREFIX = "https://www.netflix.com/title/";
const HOTSTAR_URL_FORMAT = "http://www.hotstar.com/movies/$title/$id";

exports.fetchInRange = function(fromId, toId, done) {
    db.get().query(FETCH_QUERY, function (err, rows) {
        if(err) {
            return done(err);
        }
        rows.forEach(function (movie) {
            if(movie.netflix_id) {
                movie.netflix_url = NETFLIX_URL_PREFIX + movie.netflix_id;
            }
            else {
                delete movie.netflix_id;
            }
            if(movie.hotstar_id) {
                let slug = movie.title.trim().split(" ")[0].toLowerCase();
                movie.hotstar_url = HOTSTAR_URL_FORMAT.replace('$title', slug).replace('$id', movie.hotstar_id);
            }
            else {
                delete movie.hotstar_id;
            }
        });
        done(rows);
    });
}


