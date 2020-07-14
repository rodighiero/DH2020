import * as PIXI from 'pixi.js'

import { mouseover, mouseout } from '../mouseover'
import { drawTokens } from './tokens'
// import links from '../arial.fnt'

const splitInTwo = string => {
    const middle = Math.round(string.length / 2)
    for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
        if (string[i] === ' ') return [string.substring(0, i), string.substring(i + 1)]
        if (string[j] === ' ') return [string.substring(0, j), string.substring(j + 1)]
    }
    return [string, '']
}

const color = {
    on: 0xBD4A41,
    off: 0xCCCCCC,
}

export default () => {

    const nodes = new PIXI.Graphics()
    const stage = s.pixi.addChild(nodes)

    const nodeStyle = new PIXI.TextStyle({
        font: '4px Arial',
        fill: color.on,
        align: 'center',
    })

    s.nodes.forEach(node => {

        node.visibility = false

        // Circle

        const size = node.docs

        node.circle = new PIXI.Graphics()
        node.circle.beginFill(0xFFFFFF, 1)
        node.circle.drawCircle(0, 0, size)
        node.circle.endFill()
        node.circle.tint = color.off
        node.circle.position = new PIXI.Point(node.x, node.y)
        node.circle.interactive = true
        node.circle.hitArea = new PIXI.Circle(0, 0, s.distance)
        nodes.addChild(node.circle)

        // Label

        const [nA, nB] = splitInTwo(node.name)
        node.text = new PIXI.BitmapText(`${nA}\n${nB}`, nodeStyle)
        node.text.tint = color.off
        node.text.position.set(node.x - node.text.width / 2, node.y + size + 2)
        nodes.addChild(node.text)

        // Set information panel & set on circles

        node.circle.mouseover = mouseData => {
            mouseover(node)
            s.nodes.filter(peer => node.peers.includes(peer.id))
                .forEach(node => {
                    node.circle.tint = color.on
                    node.text.tint = color.on
                })
        }

        // Clean information panel & set off circles

        node.circle.mouseout = mouseData => {
            mouseout(node)
            s.nodes
                .forEach(node => {
                    node.circle.tint = color.off
                    node.text.tint = color.off
                })
        }

    })

}