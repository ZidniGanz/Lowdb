/*
--
Anime Class

Params : URL, Page Number, And Axios Response
Return : An Array of Animes
--
*/
const cheerio = require("cheerio")
const url = require('../constants/Url')

class Anime {
    constructor(url, page = 0, animePage){
        this.url = url
        this.page = page
        this.animePage = animePage
    }

    getAnimeList(){
        let animeList = []
        const $ = cheerio.load(this.animePage)
        const element = $('.relat')
        element.find('article').each((id, el) => {
            let title = $(el).find('.animposx > a > .data').find('h2').text().trim()
            let status = $(el).find('.animposx > a > .data > .type').text().trim()
            let slug = $(el).find('.animposx > a').attr('href').replace('https://www.animeindo.cc/anime/', '').replace('/', '').trim()
            let image = $(el).find('.animposx > a > .content-thumb > img').attr('src').replace('?quality=90&resize=150,210', '')
            let type = $(el).find('.animposx > a > .content-thumb > .type').text().trim()
            let score = $(el).find('.animposx > a > .content-thumb > .score').text().trim()
            
            animeList.push({
                title,
                status,
                slug,
                image,
                type,
                score,
            })
        })

        return animeList
    }

    getNewestAnime(){
        let animeList = []
        let url = 'https://www.animeindo.cc/'
        console.log(url.length)
        const $ = cheerio.load(this.animePage)
        const element = $('.post-show')
        element.find('article').each((id, el) => {
            let title = $(el).find('.animepost > .animposx > a > .content-thumb > .dataver2 > .title').text()
            let year = $(el).find('.animepost > .animposx > a').attr('href').replace(url, '').substr(0, 4)
            let month = $(el).find('.animepost > .animposx > a').attr('href').replace(url + year + '/', '').substr(0, 2)
            let endpoint = $(el).find('.animepost > .animposx > a').attr('href').replace(url + year + '/' + month + '/', '').substr(0).replace('/', '')
            let image = $(el).find('.animepost > .animposx > a > .content-thumb > img').attr('src').replace('?quality=90&resize=141,198', '')
            let type = $(el).find('.animepost > .animposx > a > .content-thumb > .type').text().trim()
            let episode = $(el).find('.animepost > .animposx > a > .data > .title > .episode').text().trim()

            animeList.push({
                title,
                year,
                month,
                endpoint,
                image,
                type,
                episode
            })
        })
        return animeList
    }
}

module.exports = Anime;