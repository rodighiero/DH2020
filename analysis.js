const fs = require('fs')
const combinatorics = require('js-combinatorics')
const natural = require('natural')
const sw = require('stopword')

// Load JSON

fs.readFile(__dirname + '/data/authors.json', (err, json) => {
    if (err) throw err
    analysis(JSON.parse(json))
})

// Text analysis

const analysis = authors => {

    // Reduce authors

    const min = 10 // Min. number of articles
    authors = authors.reduce((array, author, i) => {
        console.log('Filtering author #', i)
        if (author.docs >= min)
            array.push(author)
        return array
    }, [])

    // Tokenizer

    function titleCase(str) {
        if (str.length == 0) return str
        return str.split(' ').map(function (word) {
            // console.log(word)
            if (word.length == 0) return word
            return word.replace(word[0], word[0].toUpperCase())
        }).join(' ')
    }
    // titleCase("I'm a little tea pot");

    const tokenizer = new natural.WordTokenizer()
    // const tokenizer = new natural.TreebankWordTokenizer()
    authors.forEach((author, i) => {
        console.log('Tokenizing author #', i)
        author.tokens = tokenizer.tokenize(author.text.toLowerCase())
    })

    // Singularize

    const inflector = new natural.NounInflector()
    const safeList = ['sars', 'trans', 'recsars', 'facs', 'mers', 'aids']
    authors.forEach((author, i) => {
        console.log('Singularizing author #', i)
        author.tokens = author.tokens.map(t => {
            if ((safeList.includes(t) && t.length > 3) || /us$/.test(t) || /is$/.test(t)) {
                return t
            } else {
                return inflector.singularize(t)
            }
        })
    })

    // Cleaning

    const stopWords = ['not', 'virus', 'coronavirus']
    authors.forEach((author, i) => {
        console.log('Cleaning author #', i)
        author.tokens = sw.removeStopwords(author.tokens, sw.en.concat(stopWords))
            // .map(token => token.replace(token[0], token[0].toUpperCase()))
            .filter(token => token.length > 2)
            .filter(token => !parseInt(token))
    })

    // TF-IDF

    const tokenFrequency = new natural.TfIdf()
    authors.forEach((author, i) => {
        console.log('Frequencing for author #', i)
        tokenFrequency.addDocument(author.tokens)
    })

    // Reduction and shaping

    const max = 20
    authors.forEach((author, i) => {
        console.log('Reducing for author #', i)
        author.tokens = tokenFrequency.listTerms(i)
            .slice(0, max)
    })

    // Set nodes

    let nodes = authors.reduce((array, author) => {
        delete author.text
        author.relevancy = Math.floor(author.tokens.map(t => t.tfidf).reduce((a, b) => a + b))
        array.push(author)
        return array
    }, [])

    // Set links

    const pairs = combinatorics.bigCombination(authors, 2)
    const links = []
    let maxCommonTokens = 0
    let i = pairs.length

    pairs.forEach(pair => {

        const min = 10
        const p1 = pair[0], p2 = pair[1]
        const t1 = p1.tokens, t2 = p2.tokens
        const tokens = t1.map(t => t.term).filter(term => t2.map(t => t.term).includes(term))
        i = i - 1

        if (tokens.length <= min)
            return

        if (tokens.length > maxCommonTokens)
            maxCommonTokens = tokens.length

        console.log('#', i, '|', tokens.length, 'terms between', p2.name, 'and', p1.name)

        tokens.forEach(token => {

            const link = links.find(link => link.source === p1.id && link.target === p2.id)
            const value = t1.find(t => t.term == token).tfidf + t2.find(t => t.term == token).tfidf

            if (link) {
                link.value += value
                link.tokens[token] = value
            } else {
                const link = {
                    source: p1.id,
                    target: p2.id,
                    value: value,
                    tokens: {
                        [token]: value,
                    }
                }
                links.push(link)
            }
        })
    })

    // Normalization

    links.forEach(link => link.value = Math.floor(link.value))
    const maxLinkValue = links.reduce((max, link) => max > link.value ? max : link.value, 0)
    const minLinkValue = links.reduce((min, link) => min < link.value ? min : link.value, Infinity)
    links.forEach(link => link.value = link.value / maxLinkValue)

    // Cleaning nodes without relations

    const connectedNodes = links.reduce((array, link) => {
        if (!array.includes(link.source)) array.push(link.source)
        if (!array.includes(link.target)) array.push(link.target)
        return array
    }, [])

    nodes = nodes.filter(node => connectedNodes.includes(node.id))

    // Nationality

    const csv = require('csv-parser')

    fs.createReadStream('data/diaspora.csv')
        .pipe(csv({ separator: '|' }))
        .on('data', (row) => {
            // console.log()
            const name = row['#uid'].split('/')[1]
            const nationality = row['ethnicity']
            const node = nodes.find(node => node.name == name)
            if (node) {
                const nodesWithId = nodes.filter(n => n.peers.includes(node.id))
                nodesWithId.forEach(node => {
                    if (!node.nationalities) node.nationalities = {}
                    if (node.nationalities[nationality])
                        node.nationalities[nationality]++
                    else
                        node.nationalities[nationality] = 1

                })
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed')
            fs.writeFile('./src/data/nodes.json', JSON.stringify(nodes), err => { if (err) throw err })
            fs.writeFile('./data/nodes.json', JSON.stringify(nodes, null, '\t'), err => { if (err) throw err })
        })

    // Writing files

    fs.writeFile('./src/data/links.json', JSON.stringify(links), err => { if (err) throw err })
    fs.writeFile('./data/links.json', JSON.stringify(links, null, '\t'), err => { if (err) throw err })

    // Final report

    const format = x => JSON.stringify(x).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    console.log(`     nodes.json : ${format(nodes)}kb for ${nodes.length} authors`)
    console.log(`     links.json : ${format(links)}kb for ${links.length} links`)
    console.log(`   maxLinkValue : ${maxLinkValue}`)
    console.log(`   minLinkValue : ${minLinkValue}`)
    console.log(`maxCommonTokens : ${maxCommonTokens}`)

}