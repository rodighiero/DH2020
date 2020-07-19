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

    
    const triplets = combinatorics.bigCombination(nodes, 3)
    
    console.log('nodes', nodes.length)
    console.log('triplets', triplets.length)

    const distance = 40
    const gap = 5
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
        const close = proximity(t1, t2) && proximity(t2, t3) && proximity(t3, t1)

        const l1 = t1.tokens.reduce((array, token) => {
            array.push(token.term)
            return array
        }, [])
        const l2 = t2.tokens.reduce((array, token) => {
            array.push(token.term)
            return array
        }, [])
        const l3 = t3.tokens.reduce((array, token) => {
            array.push(token.term)
            return array
        }, [])
        const list = l1.filter(t => l2.includes(t)).filter(t => l3.includes(t))

        if (close && (list.length > 0) ) {

            console.log(counter)

            obj = {}

            const x = (t1.x + t2.x + t3.x) / 3
            const y = (t1.y + t2.y + t3.y) / 3
            
            let tokens = []

            list.forEach(token => {
                tokens.push([token, t1.tokens[token] + t2.tokens[token] + t3.tokens[token]])
                
            })
            
            obj.position = [x, y]
            obj.tokens = tokens
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