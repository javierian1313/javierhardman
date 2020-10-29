const db = require("../db");

module.exports = {
    order1: function (req, res) {
        db.query(`SELECT * FROM orderStatus;`, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order2: function (req, res) {
        console.log("Hello World");
        console.log(req.params.testParam);
        res.end();
    },
    order3: function (req, res) {
        console.log("Testing file");
        res.end();
    },
};
