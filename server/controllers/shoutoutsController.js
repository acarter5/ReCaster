const db = require('../../database/operations')
const axios = require('axios')
const { getShoutOutIdx, formatText } = require('../ServerUtils')

const newShoutout = (req, mainres) => {
    const id = req.params.id
    const title = req.body.title
    const time = req.body.shoutoutTime
    const url = req.body.src
    let shoutOuts
    let newIdx
    let imgSRC
    let wikipediaData

    db.episodeById(id, async (err, results) => {
        shoutOuts = JSON.parse(results[0].shoutouts)
        newIdx = getShoutOutIdx(shoutOuts, time)

        if (newIdx === -1) {
            mainres.status(409).send('given timespot already allocated')
        } else {
            try {
                wikipediaData = await axios.get(
                    'https://en.wikipedia.org/w/api.php',
                    {
                        params: {
                            format: 'json',
                            action: 'query',
                            formatversion: 2,
                            prop: 'extracts',
                            redirects: 1,
                            exintro: true,
                            explaintext: true,
                            titles: title
                        }
                    }
                )
                wikipediaData = wikipediaData.data
            } catch (err) {
                mainres
                    .status(404)
                    .send('err retriving text from wikipedia api' + err)
            }

            const displayTitle = wikipediaData.query.pages[0].title
            const text = formatText(wikipediaData.query.pages[0].extract)

            try {
                const {
                    data: {
                        query: {
                            pages: [imgResult]
                        }
                    }
                } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                    params: {
                        format: 'json',
                        action: 'query',
                        pithumbsize: 100,
                        formatversion: 2,
                        prop: 'pageimages',
                        titles: title
                    }
                })

                imgSRC = imgResult.thumbnail.source
            } catch (err) {
                console.log('err in first pic retreval, sending 2nd request')
                let imgArr
                let imgTitle

                try {
                    const {
                        data: {
                            query: {
                                pages: [imgResult]
                            }
                        }
                    } = axios.get('https://en.wikipedia.org/w/api.php', {
                        params: {
                            format: 'json',
                            action: 'query',
                            formatversion: 2,
                            prop: 'images',
                            titles: title
                        }
                    })

                    imgArr = imgResult.images
                    imgTitle = imgArr[imgArr.length - 1].title.replace(
                        'File:',
                        ''
                    )
                } catch (err) {
                    console.log('error in imgTitle retreval')
                    mainres.status(404).send('err retriving imgTitle' + err)
                }

                try {
                    const {
                        data: {
                            query: {
                                pages: [imgResult]
                            }
                        }
                    } = axios.get('https://en.wikipedia.org/w/api.php', {
                        params: {
                            format: 'json',
                            action: 'query',
                            formatversion: 2,
                            prop: 'imageinfo',
                            iiprop: 'url',
                            titles: `Image:${imgTitle}`
                        }
                    })

                    imgSRC = imgResult.imageinfo[0].url
                } catch (err) {
                    console.log('err in 2nd pic retreval')
                    mainres.status(404).send('err in 2nd pic retreval' + err)
                }
            }

            const newShoutOut = [
                {
                    timespot: time,
                    img: imgSRC,
                    link: url,
                    short: text,
                    title: displayTitle
                }
            ]

            const newShoutOuts = shoutOuts
                .slice(0, newIdx)
                .concat(newShoutOut)
                .concat(shoutOuts.slice(newIdx))

            db.addShoutOut(id, JSON.stringify(newShoutOuts), (err, results) => {
                if (err) {
                    mainres.status(404).send('err in db query' + err)
                }

                mainres.status(200).send(results)
            })

            //     .then(res => {
            //         displayTitle = res.data.query.pages[0].title
            //         text = formatText(res.data.query.pages[0].extract)
            //         axios
            //             .get(`https://en.wikipedia.org/w/api.php`, {
            //                 params: {
            //                     format: 'json',
            //                     action: 'query',
            //                     pithumbsize: 100,
            //                     formatversion: 2,
            //                     prop: 'pageimages',
            //                     titles: title
            //                 }
            //             })
            //             .then(res => {
            //                 imgSRC = res.data.query.pages[0].thumbnail.source //1
            //                 newShoutOut = [
            //                     {
            //                         timespot: time,
            //                         img: imgSRC,
            //                         link: url,
            //                         short: text,
            //                         title: displayTitle
            //                     }
            //                 ]
            //                 newShoutOuts = shoutOuts
            //                     .slice(0, newIdx)
            //                     .concat(newShoutOut)
            //                     .concat(shoutOuts.slice(newIdx))

            //                 db.addShoutOut(
            //                     id,
            //                     JSON.stringify(newShoutOuts),
            //                     (err, results) => {
            //                         try {
            //                             mainres
            //                                 .status(200)
            //                                 .send(
            //                                     'shoutout posted',
            //                                     results,
            //                                     err
            //                                 )
            //                         } catch (err) {
            //                             console.log('in err', err, results)
            //                             mainres.status(404).send(err)
            //                         }
            //                     }
            //                 )
            //             })
            //             .catch(err => {
            //                 console.log(
            //                     'err retriving pic from wikipedia api',
            //                     err
            //                 )

            //                 axios
            //                     .get('https://en.wikipedia.org/w/api.php', {
            //                         params: {
            //                             format: 'json',
            //                             action: 'query',
            //                             formatversion: 2,
            //                             prop: 'images',
            //                             titles: title
            //                         }
            //                     })
            //                     .then(res => {
            //                         imgArr = res.data.query.pages[0].images
            //                         imgTitle = imgArr[
            //                             imgArr.length - 1
            //                         ].title.replace('File:', '')

            //                         axios
            //                             .get(
            //                                 'https://en.wikipedia.org/w/api.php',
            //                                 {
            //                                     params: {
            //                                         format: 'json',
            //                                         action: 'query',
            //                                         formatversion: 2,
            //                                         prop: 'imageinfo',
            //                                         iiprop: 'url',
            //                                         titles: `Image:${imgTitle}`
            //                                     }
            //                                 }
            //                             )
            //                             .then(res => {
            //                                 imgSRC = //2
            //                                     res.data.query.pages[0]
            //                                         .imageinfo[0].url
            //                                 newShoutOut = [
            //                                     {
            //                                         timespot: time,
            //                                         img: imgSRC,
            //                                         link: url,
            //                                         short: text,
            //                                         title: displayTitle
            //                                     }
            //                                 ]
            //                                 newShoutOuts = shoutOuts
            //                                     .slice(0, newIdx)
            //                                     .concat(newShoutOut)
            //                                     .concat(shoutOuts.slice(newIdx))

            //                                 db.addShoutOut(
            //                                     id,
            //                                     JSON.stringify(newShoutOuts),
            //                                     (err, results) => {
            //                                         try {
            //                                             mainres
            //                                                 .status(200)
            //                                                 .send(
            //                                                     'shoutout posted',
            //                                                     results,
            //                                                     err
            //                                                 )
            //                                         } catch (err) {
            //                                             console.log(
            //                                                 'in err',
            //                                                 err,
            //                                                 results
            //                                             )
            //                                             mainres
            //                                                 .status(404)
            //                                                 .send(err)
            //                                         }
            //                                     }
            //                                 )
            //                             })
            //                             .catch(err =>
            //                                 console.log(
            //                                     'err in 3rd pic retrieval',
            //                                     err
            //                                 )
            //                             )
            //                     })
            //                     .catch(err =>
            //                         console.log(
            //                             'error in 2nd pic retrieval',
            //                             err
            //                         )
            //                     )
            //             })
            //     })
            // .catch(err =>
            //     mainres
            //         .status(404)
            //         .send('err retriving text from wikipedia api', err)
            // )
        }
    })
}

module.exports = { newShoutout }
