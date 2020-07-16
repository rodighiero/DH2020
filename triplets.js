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
    // const links = []
    // let maxCommonTokens = 0
    // let i = pairs.length

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

    counter = 0

    triplets.forEach(triplet => {

        const t1 = triplet[0]
        const t2 = triplet[1]
        const t3 = triplet[2]

        if (proximity(t1, t2) && proximity(t2, t3) && proximity(t3, t1)) {
            console.log('\n')
            console.log(t1.x, t1.y)
            console.log(t2.x, t2.y)
            console.log(t3.x, t3.y)

            counter += 1
            console.log(counter)
        }

    })

    // Time end

    const end = Date.now()
    const d = new Date(end - start)
    console.log(`Time computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms`)




}