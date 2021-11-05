import { select } from 'd3'

const space = '&nbsp;'
const line = '—————————————'
const block = '<span class="block"></span>'


export function click(node) {

    select('#focus').remove()
    s.tokens = []

    const focus = select('body').append('div').attr('id', 'focus')

    // Heading

    focus.append('h2').html(node.name)
    focus.append('h3').html(`${node.docs} Publications`)

    // Tokens

    focus.append('p').html(space)
    focus.append('h3').html('Tokens by tf-idf')
    focus.append('p').html(line)
    Object.entries(node.tfidf).slice(0, 20)
        .forEach(([key, value]) => {
            const blocks = block.repeat(value)
            focus.append('p').html(`${blocks} &nbsp; ${key}`)
        })

}