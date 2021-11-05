export default () => {

    let attr

    console.log('')
    console.log('')
    console.log('TOP20 BY RELEVANCY')
    console.log('')
    attr = 'relevancy'
    s.nodes
        .sort((a, b) => {
            if (a[attr] > b[attr]) return -1
            return a[attr] < b[attr] ? 1 : 0
        })
        .slice(0, 20)
        .forEach(({ name, relevancy }, i) => {
            console.log(`${i + 1}\t${relevancy}\t${name}`)
        })

    console.log('')
    console.log('')
    console.log('TOP20 BY PUBLICATIONS')
    console.log('')
    attr = 'docs'
    s.nodes
        .sort((a, b) => {
            if (a[attr] > b[attr]) return -1
            return a[attr] < b[attr] ? 1 : 0
        })
        .slice(0, 20)
        .forEach(({ name, docs }, i) => {
            console.log(`${i + 1}\t${docs}\t${name}`)
        })

    console.log('')
    console.log('')
    console.log('TOP20 BY PEERS')
    console.log('')
    attr = 'coauthors'
    s.nodes.forEach(node => node[attr] = node.peers.length)
    s.nodes
        .sort((a, b) => {
            if (a[attr] > b[attr]) return -1
            return a[attr] < b[attr] ? 1 : 0
        })
        .slice(0, 20)
        .forEach(({ name, coauthors }, i) => {
            console.log(`${i + 1}\t${coauthors}\t${name}`)
        })



}