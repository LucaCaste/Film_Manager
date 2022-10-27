const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const crypto = require('crypto');

class DB {

    constructor() {
        this.db = new sqlite.Database('./films.db', (err) => {
            if (err) throw err;
        });
    }

    queryDBAll(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log("Error query: " + sql);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    queryDBRun(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.log("Error query: " + sql);
                    reject(err);
                }
                else
                    resolve(true);
            })
        })
    }

    async getFilms(user) {
        const query = "SELECT * FROM films WHERE user = ?";
        return await this.queryDBAll(query, [user]);
    }

    async getFilmsFavorite(user) {
        const query = "SELECT * FROM films WHERE favorite = 1 AND user = ? ";
        return await this.queryDBAll(query, [user]);
    }
    async getFilmsSeenLastMonth(user) {
        const query = "SELECT * FROM films WHERE watchdate >= ? AND watchdate <= ? AND user = ?";
        return await this.queryDBAll(query, [dayjs().subtract(30, 'day').format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"), user]);;
    }
    async getFilmsBestRated(user) {
        const query = "SELECT * FROM films WHERE rating = 5 AND user = ?";
        return await this.queryDBAll(query, [user]);
    }
    async getFilmsUnseen(user) {
        const query = "SELECT * FROM films WHERE watchdate = 'Invalid Date' aND user = ?";
        return await this.queryDBAll(query, [user]);
    }
    async getFilmsById(id, user) {
        const query = "SELECT * FROM films WHERE id = ? AND user = ?";
        return await this.queryDBAll(query, [id, user]);
    }
    async getFilmsByTitle(title, user) {
        const query = "SELECT * FROM films WHERE title = ? AND user = ?";
        return await this.queryDBAll(query, [title, user]);
    }
    async createFilm(b, usrId) {
        const values = [b.title, b.favorite, b.watchdate, b.rating, usrId];
        const query = "INSERT INTO films (title, favorite, watchdate, rating, user) VALUES (?,?,?,?,?) ";
        return await this.queryDBAll(query, values);
    }

    async updateFilm(b, id, usrId) {
        const values = [b.title, b.favorite, b.watchdate, b.rating, usrId, id];
        const query = "UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE user = ? AND id = ? ";
        return await this.queryDBRun(query, values);
    }

    async deleteFilm(id, usrId) {
        const query = "DELETE FROM films WHERE id = ? AND user = ?;";
        return await this.queryDBRun(query, [id, usrId]);
    }

    async getUserById(id) {
        const query = "SELECT * FROM users WHERE id = ?;";
        return await this.queryDBAll(query, [id]);
    };

    async getUser(email, password) {
        const sql = "SELECT * FROM users WHERE email = ?";
        return new Promise((resolve, reject) => {
            this.db.get(sql, [email], (err, row) => {
                if (err) { reject(err); }
                else if (row === undefined) { resolve(false); }
                else {
                    const user = { id: row.id, username: row.email, name: row.name };
                    const salt = row.salt;
                    crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                        if (err) {
                            reject(err);
                        }

                        const passwordHex = Buffer.from(row.hash, 'hex');

                        if (!crypto.timingSafeEqual(passwordHex, hashedPassword)) {
                            resolve(false);
                        }
                        else resolve(user);
                    });
                }
            });
        });
    };
}

module.exports = DB;