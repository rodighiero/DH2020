const fs = require('fs')
const combinatorics = require('js-combinatorics')
const natural = require('natural')
const sw = require('stopword')

const reuse = require('d3-force-reuse')
const d3 = require('d3')

// Time counter

const start = Date.now()

// Load JSON

fs.readFile(__dirname + '/data/nodes.json', (err, json) => {
    if (err) throw err
    analysis(JSON.parse(json))
})

// Text analysis

const analysis = nodes => {

    console.log('nodes', nodes.length)

    const distance = 40
    const gap = 10
    min = Math.pow(distance * 2 - gap, 2)
    max = Math.pow(distance * 2 + gap, 2)
    const proximity = (a, b) => {
        const deltaX = Math.abs(a.x - b.x)
        const deltaY = Math.abs(a.y - b.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        return (min < distance && distance < max)
    }

    const intersection = (a, b) => {
        return a.filter(t => b.includes(t))
    }

    let counter = 0
    let result = []

    for (let i1 = 0; i1 < nodes.length; i1++) {

        const n1 = nodes[i1]

        for (let i2 = i1 + 1; i2 < nodes.length; i2++) {

            const n2 = nodes[i2]

            if (!proximity(n1, n2)) continue

            const l1 = n1.tokens.map(token => token.term)
            const l2 = n2.tokens.map(token => token.term)
            const l12 = intersection(l1, l2)
            if (l12.length == 0) continue

            for (let i3 = i2 + 1; i3 < nodes.length; i3++) {

                const n3 = nodes[i3]

                if (!proximity(n2, n3)) continue
                if (!proximity(n3, n1)) continue

                const l3 = n3.tokens.map(token => token.term)
                let list = intersection(l12, l3)
                if (list.length == 0) continue

                const x = (n1.x + n2.x + n3.x) / 3
                const y = (n1.y + n2.y + n3.y) / 3

                list = list.map(token => {
                    const v1 = (n1.tokens.find(t => t.term == token).tfidf)
                    const v2 = (n2.tokens.find(t => t.term == token).tfidf)
                    const v3 = (n3.tokens.find(t => t.term == token).tfidf)
                    return [token, v1 + v2 + v3]
                })

                result.push({
                    position: [x, y],
                    tokens: list.sort((a, b) => a - b)
                })

                counter += 1
                console.log(counter)

            }
        }
    }

    // Writing files

    fs.writeFile('./src/data/triplets.json', JSON.stringify(result), err => { if (err) throw err })
    fs.writeFile('./data/triplets.json', JSON.stringify(result, null, '\t'), err => { if (err) throw err })

    // Time end

    const end = Date.now()
    const d = new Date(end - start)
    console.log(`Time computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms`)




}