/*
--
Initial
--
*/
const router = require("express").Router()
const axios = require('axios').default;
const url = require('../constants/Url')
let Anime = require('../modules/Anime')

/*
--
Routes
--
*/
router.get('/', function (req, res) {
    res.status(404).json({
        message: "Please add the page number",
    });
})

router.get('/:page', async (req, res) => {
    let page = req.params.page

    let fullUrl = url.baseURL + url.POPULAR_ENDPOINT + page

    //TODO: Please refactor this pagination to a modular one.
    let nextUrl = ''
    let prevUrl = ''
    if (page === '1'){
        next = parseInt(page) + 1
        nextUrl = req.protocol + '://' + req.get('host') + '/api/anime/popular/' + next
    } else {
        next = parseInt(page) + 1
        prev = parseInt(page) - 1
        nextUrl = req.protocol + '://' + req.get('host') + '/api/anime/popular/' + next
        prevUrl = req.protocol + '://' + req.get('host') + '/api/anime/popular/' + prev
    }

    try{
        let response = await axios.get(fullUrl)
        let popularAnime = new Anime(fullUrl, page, String(response.data))

        res.status(200).json({
            status: 200,
            message: 'Success',
            url: {
                source: fullUrl,
                current:  req.protocol + '://' + req.get('host') + req.originalUrl,
                next: nextUrl,
                prev: prevUrl
            },
            animeList: popularAnime.getAnimeList()
        })
    } catch (e) {
        console.log(e)
        res.status(404).json({
            message: '404: response not found.'
        })
    }
})

module.exports = router;