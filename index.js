/*
--
Initial
--
*/
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

/*
--
Security Dependencies
--
*/
const cors = require("cors")
const helmet = require("helmet")

app.use(cors())
app.use(helmet())

/*
--
Routes
--
*/
const popular = require('./routes/Popular')
const ongoing = require('./routes/Ongoing')
const newest = require('./routes/Newest')

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello and Welcome, for more information checkout our Github page",
    });
})

app.use('/api/anime/popular', popular)
app.use('/api/anime/ongoing', ongoing)
app.use('/api/anime/newest', newest)


app.listen(PORT, () => {
    console.log("Listening on PORT:" + PORT);
});

