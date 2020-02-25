const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = process.env.PORT || 3000;
const Pool = require('pg').Pool

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/dbcreatetable', function (req, res) {
    console.log("Creating table...")

    const pool = new Pool({
        database: 'postgres',
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
    })

    pool.query("CREATE TABLE content (ID SERIAL PRIMARY KEY, data text);", (err, res) => {
        console.log(err, res);
        pool.end();
    });

    console.log("Table created.")
})

router.get('/dbinserttable', function (req, res) {
    console.log("Inserting into table...")

    const pool = new Pool({
        database: 'postgres',
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
    })

    let d = new Date();
    let n = d.getTime().toString();

    pool.query(
        "INSERT INTO content(data)VALUES(" + n + ")",
        (err, res) => {
            console.log(err, res);
            pool.end();
        }
    );

    console.log("Insert complete.")
})

app.use('/', router);
app.listen(port);

console.log('Running at Port ' + port);