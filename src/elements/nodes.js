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

let stage

const color = {
    on: 0xFFFFFF,
    off: 0x777777,
}

export function initNodes() {

    const nodes = new PIXI.Graphics()
    stage = s.pixi.addChild(nodes)

    const nodeStyle = new PIXI.TextStyle({
        font: '3px Arial',
        fill: color.on,
        align: 'center',
    })

    s.nodes.forEach(node => {

        node.visibility = false

        // Circle

        node.gpxCircle = new PIXI.Graphics()
        node.gpxCircle.beginFill(0xFFFFFF, 1)
        node.gpxCircle.drawCircle(0, 0, 1)
        node.gpxCircle.endFill()
        nodes.addChild(node.gpxCircle)

        // Label

        // s.BitmapText = PIXI.BitmapText

        const [nA, nB] = splitInTwo(node.name)
        // .registerFont(s.arialXML, s.arialPNG)
        node.gpxText = new PIXI.BitmapText(`${nA}\n${nB}`, nodeStyle)
        // node.gpxText = new PIXI.BitmapText()
        nodes.addChild(node.gpxText)

        // Interaction

        node.gpxCircle.interactive = true
        node.gpxCircle.hitArea = new PIXI.Circle(0, 0, s.distance)

        // Set information panel & set on circles

        node.gpxCircle.mouseover = mouseData => {
            mouseover(node)
            const include = s.nodes.filter(peer => node.peers.includes(peer.id))
            include.forEach(node => node.visibility = true)
            drawNodes()
            drawTokens()
        }

        // Clean information panel & set off circles

        node.gpxCircle.mouseout = mouseData => {
            mouseout(node)
            s.nodes.forEach(node => node.visibility = false)
            drawNodes()
            drawTokens()
        }

    })

}

const infinity = new PIXI.Point(Infinity, Infinity)

export function drawNodes() {

    stage.clear()

    s.nodes.forEach(node => {

        const { x, y, gpxCircle, gpxText, visibility } = node

        gpxCircle.position = new PIXI.Point(x, y)
        gpxText.position.set(x - gpxText.width / 2, y + 3)

        if (visibility) {
            gpxCircle.tint = color.on
            gpxText.tint = color.on
        }
        else {
            gpxCircle.tint = color.off
            gpxText.tint = color.off
        }

    })

}