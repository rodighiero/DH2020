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

    console.log(nodes.length)

    const triplets = combinatorics.bigCombination(nodes, 3)

    console.log(triplets.length)

    const distance = 40
    const gap = 2
    min = Math.pow(distance * 2 - gap, 2)
    max = Math.pow(distance * 2 + gap, 2)

    const proximity = (a, b) => {
        const deltaX = Math.abs(a.x - b.x)
        const deltaY = Math.abs(a.y - b.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        return (min < distance && distance < max)
    }

    counter = triplets.length
    result = []

    triplets.forEach(triplet => {

        counter -= 1

        const t1 = triplet[0]
        const t2 = triplet[1]
        const t3 = triplet[2]

        if (proximity(t1, t2) && proximity(t2, t3) && proximity(t3, t1)) {

            console.log(counter)

            obj = {}

            const x = (t1.x + t2.x + t3.x) / 3
            const y = (t1.y + t2.y + t3.y) / 3

            const position = [x, y]

            obj.position = position

            const tokens = t1.tokens.reduce((tokens, token) => {
                tokens[token.term] = token.tfidf
                return tokens
            }, { })
            
            t2.tokens.forEach(t => {
                if (tokens[t.term]) tokens[t.term] += t.tfidf
                else tokens[t.term] = t.tfidf
            })

            t3.tokens.forEach(t => {
                if (tokens[t.term]) tokens[t.term] += t.tfidf
                else tokens[t.term] = t.tfidf
            })



            obj.tokens = Object.entries(tokens).sort(function(a, b) { return a[1] - b[1] })

            result.push(obj)

        }

    })

    // Writing files

    fs.writeFile('./src/data/triplets.json', JSON.stringify(result), err => { if (err) throw err })
    fs.writeFile('./data/triplets.json', JSON.stringify(result, null, '\t'), err => { if (err) throw err })

    // Time end

    const end = Date.now()
    const d = new Date(end - start)
    console.log(`Time computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms`)




}