const passport = require('passport')

module.exports = function (app, db) {

    // custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
      return next();
    
    return res.status(401).json({ error: 'not authenticated'});
  }

    //GET /api/films
    app.get('/api/films',isLoggedIn, async (req, res) => { 
        try {
            const films = await db.getFilms(req.user[0].id);
            return res.status(200).json(films);
        } catch (err) {
            return res.status(500).json();
        }
    });
    //GET /api/film/:id
    app.get('/api/film/:id',isLoggedIn, async (req, res) => { 
        try {
            const films = await db.getFilmsById(req.params.id, req.user[0].id);
            if (films.length == 0) {
                return res.status(404).json();
            } else {
                return res.status(200).json(films);
            }
        } catch (err) {
            return res.status(500).json();
        }
    });

    //GET /api/films/favorite
    app.get('/api/films/favorite',isLoggedIn, async (req, res) => { 
        try {
            const films = await db.getFilmsFavorite(req.user[0].id);
            return res.status(200).json(films);
        } catch (err) {
            return res.status(500).json();
        }
    });

    //GET /api/films/bestrated
    app.get('/api/films/bestrated',isLoggedIn, async (req, res) => { 
        try {
            const films = await db.getFilmsBestRated(req.user[0].id);
            return res.status(200).json(films);
        } catch (err) {
            return res.status(500).json();
        }
    });

    //GET /api/films/seenlastmonth
    app.get('/api/films/seenlastmonth',isLoggedIn, async (req, res) => { 
        try {
            const films = await db.getFilmsSeenLastMonth(req.user[0].id);
            return res.status(200).json(films);
        } catch (err) {
            return res.status(500).json();
        }
    });


    //GET /api/films/unseen
    app.get('/api/films/unseen',isLoggedIn, async (req, res) => { 
        try {
            const films = await db.getFilmsUnseen(req.user[0].id);
            return res.status(200).json(films);
        } catch (err) {
            return res.status(500).json();
        }
    });

    //POST /api/film
    app.post('/api/film',isLoggedIn, async (req, res) => { 
        try {
            await db.createFilm(req.body, req.user[0].id);
            return res.status(201).json();
        } catch (err) {
            return res.status(503).json();
        }
    });

    //DELETE /api/film/:id
    app.delete('/api/film/:id',isLoggedIn, async (req, res) => {
        try {
            await db.deleteFilm(req.params.id, req.user[0].id);
            return res.status(204).json();
        } catch (err) {
            return res.status(503).json(err);
        }

    });

    //PUT /api/film/:id
    app.put('/api/film/:id',isLoggedIn, async (req, res) => {
        const presence = await db.getFilmsById(req.params.id, req.user[0].id);
        if (presence.length == 0) {
            return res.status(404).json();
        } else {
            try {
                await db.updateFilm(req.body, req.params.id, req.user[0].id);
                return res.status(200).json();
            } catch (err) {
                return res.status(503).json(err);
            }
        }
    });


    /*** Users APIs ***/

    // POST /sessions 
    // login
    app.post('/api/sessions', function (req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err)
                return next(err);
            if (!user) {
                // display wrong login messages
                return res.status(401).json(info);
            }
            // success, perform the login
            req.login(user, (err) => {
                if (err) return next(err);
                return res.json(req.user);
            });
        })(req, res, next);
    });

    // DELETE /sessions/current 
    // logout
    app.delete('/api/sessions/current', (req, res) => {
        req.logout(() => { res.end(); });
    });

    // GET /sessions/current
    // check whether the user is logged in or not
    app.get('/api/sessions/current', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).json(req.user);
        }
        else
            res.status(401).json({ error: 'Unauthenticated user!' });
    });
}