const express = require("express");
const db = require("./db");
// const routerExample = require("./routes/routerExample");
const routerDashboard = require("./routes/Dashboard/routerDashboard");
const routerWholesale = require("./routes/Dashboard/Wholesale/routerWholesale");
const routerLogin = require("./routes/Login/routerLogin");

const app = express();

db.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + db.threadId);
});

// This is used for production
// app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json());

// Anytime you hit an api that starts with /api/routerTest/ it will route you to the file routerExample
// app.use("/api/routerTest/", routerExample);

// Start of real calls
app.use("/api/dashboard/", routerDashboard);
app.use("/api/wholesale/", routerWholesale);
app.use("/api/login/", routerLogin);

app.listen(3000, function () {
    console.log("Listening on port 3000");
});
