const db = require("../../db");

module.exports = {
    order1: function (req, res) {
        const { session_id } = req.body;

        db.query(`SELECT session_id FROM user WHERE session_id = ${session_id} AND prevent_login != 1;`, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
};
