const express = require('express');
const jHand = require('./modules/jsonHandler')
const app = express();
app.use(express.urlencoded({ extended: false }));



app.get("/api", (req, res) => {
    res.json(jHand.fDetail_list)
})


app.listen(5000, console.log('server is running..'))