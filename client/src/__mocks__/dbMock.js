import { getShoutOutIdx } from '../../../server/ServerUtils'

const defaultData = [
    {
        id: 1,
        title: 'Wikipedia',
        series_id: 1,
        src:
            'https://play.podtrac.com/npr-510313/ondemand.npr.org/anon.npr-podcasts/podcast/npr/hibt/2018/02/20180223_hibt_wikipedia-c2d9f4e7-ccd9-40d0-b07f-e6e4a87e1657.mp3?orgId=1&d=2628&p=510313&story=588068536&t=podcast&e=588068536&siteplayer=true23.4.1',
        shoutouts: JSON.stringify([
            {
                timespot: 1,
                img:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Africa_%28orthographic_projection%29.svg/100px-Africa_%28orthographic_projection%29.svg.png',
                link: 'https://en.wikipedia.org/wiki/Africa',
                short:
                    "Africa is the world's second largest and second most-populous continent, being behind Asia in both categories. At about 30.3 million km2 (11.7 million square miles) including adjacent islands, it covers 6% of Earth's total surface area and 20% of its land area. With 1.2 billion people as of 2016, it accounts for about 16% of the world's human population.",
                title: 'Africa'
            },
            {
                timespot: 1126,
                img:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Africa_%28orthographic_projection%29.svg/100px-Africa_%28orthographic_projection%29.svg.png',
                link: 'https://en.wikipedia.org/wiki/Africa',
                short:
                    "Africa is the world's second largest and second most-populous continent, being behind Asia in both categories. At about 30.3 million km2 (11.7 million square miles) including adjacent islands, it covers 6% of Earth's total surface area and 20% of its land area. With 1.2 billion people as of 2016, it accounts for about 16% of the world's human population.",
                title: 'Africa'
            }
        ])
    }
]

const db = {
    data: JSON.parse(JSON.stringify(defaultData)),
    get: function() {
        return this.data
    },
    addShoutout: function(newShoutout) {
        const curShoutouts = JSON.parse(this.data[0].shoutouts)
        const newIdx = getShoutOutIdx(curShoutouts, newShoutout.timespot)

        const newShoutOuts = curShoutouts
            .slice(0, newIdx)
            .concat(newShoutout)
            .concat(curShoutouts.slice(newIdx))

        this.data[0].shoutouts = JSON.stringify(newShoutOuts)
    },
    reset: function() {
        this.data = JSON.parse(JSON.stringify(defaultData))
    }
}

export default db
