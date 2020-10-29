const db = require("../../../db");

module.exports = {
    order1: function (req, res) {
        db.query("SELECT * FROM m_inventory_values;", function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order2: function (req, res) {
        db.query("SELECT * FROM m_previous_business_day;", function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order3: function (req, res) {
        db.query("SELECT * FROM m_user_statuses;", function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order4: function (req, res) {
        db.query(
            "SELECT * FROM (SELECT Make, Value, Quantity, AvgValue AS 'AvgValue', Last30Days FROM m_inventory_values_make_topten UNION SELECT 'Other' AS 'Make', SUM(Value), SUM(Quantity), SUM(AvgValue), SUM(Last30Days) FROM m_inventory_values_make WHERE Make NOT IN (SELECT Make FROM m_inventory_values_make_topten)) AS x ORDER BY Value DESC;",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
    order5: function (req, res) {
        db.query("SELECT * FROM m_inventory_values_stock;", function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order6: function (req, res) {
        db.query("SELECT * FROM m_inventory_values_color_code;", function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    },
    order7: function (req, res) {
        db.query(
            "SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(TotalQuantity) AS 'TotalQuantity', SalesRep FROM m_sales_last_1_month GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate) , SalesRep UNION SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(TotalQuantity) AS 'TotalQuantity', 'Total' AS 'SalesRep' FROM m_sales_last_1_month GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate);",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
    order8: function (req, res) {
        db.query(
            "SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(TotalQuantity) AS 'TotalQuantity', SalesRep FROM m_sales_last_3_months GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate) , SalesRep UNION SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(TotalQuantity) AS 'TotalQuantity', 'Total' AS 'SalesRep' FROM m_sales_last_3_months GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate);",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
    order9: function (req, res) {
        db.query(
            "SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(TotalQuantity) AS 'TotalQuantity', SalesRep FROM m_sales_last_6_months GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate) , SalesRep UNION SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(TotalQuantity) AS 'TotalQuantity', 'Total' AS 'SalesRep' FROM m_sales_last_6_months GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate);",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
    order10: function (req, res) {
        db.query(
            "SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(NWSShare) AS 'NWSShare', SUM(CITShare) AS 'CITShare', SUM(TotalQuantity) AS 'TotalQuantity' FROM m_auction_last_1_month GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate);",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
    order11: function (req, res) {
        db.query(
            "SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(NWSShare) AS 'NWSShare', SUM(CITShare) AS 'CITShare', SUM(TotalQuantity) AS 'TotalQuantity' FROM m_auction_last_3_months GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate);",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
    order12: function (req, res) {
        db.query(
            "SELECT CONCAT(YEAR(CompleteDate), '/', WEEKOFYEAR(CompleteDate)) AS 'CompleteDate', SUM(TotalValue) AS 'TotalValue', SUM(NWSShare) AS 'NWSShare', SUM(CITShare) AS 'CITShare', SUM(TotalQuantity) AS 'TotalQuantity' FROM m_auction_last_6_months GROUP BY YEAR(CompleteDate) , WEEKOFYEAR(CompleteDate);",
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
    },
};
