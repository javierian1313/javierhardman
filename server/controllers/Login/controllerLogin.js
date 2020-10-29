const db = require("../../db");
const bcrypt = require("bcrypt");

module.exports = {
    // order1: function (req, res) {
    //     const { username, password } = req.body;

    //     db.query(`SELECT * FROM user WHERE username = '${username}' LIMIT 1`, function (error, results, fields) {
    //         if (!results[0]) {
    //             return res.status(200).send({ error: "username" });
    //         } else {
    //             const prevent_login = results[0].prevent_login;
    //             const password_valid = bcrypt.compareSync(password, results[0].password);

    //             if (prevent_login === 1) {
    //                 return res.status(200).send({ error: "locked" });
    //             } else {
    //                 if (!password_valid) return res.status(200).send({ error: "password" });
    //                 else res.status(200).send({ auth: 1 });
    //             }
    //         }

    //         if (error) throw error;

    //         res.end(JSON.stringify(results));
    //     });
    // },
    order2: function (req, res) {
        const { session_id } = req.body;

        db.query(`UPDATE user SET active = 0, session_id = NULL WHERE session_id = '${session_id}';`, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order3: function (req, res) {
        const { username, session_id, width, location } = req.body;

        db.query(
            `UPDATE user SET active = 1, last_login = NOW(), session_id = '${session_id}', last_device = '${width}', last_location = '${location}' WHERE username = '${username}';`,
            function (error, results, fields) {
                if (error) throw error;

                res.end(JSON.stringify(results));
            }
        );
    },
    order4: function (req, res) {
        const { session_id } = req.body;

        db.query(`SELECT * FROM user WHERE session_id = '${session_id}'`, function (error, results, fields) {
            if (error) throw error;

            res.end(JSON.stringify(results));
        });
    },
};
