import * as PIXI from 'pixi.js'

let stage, min, max
let links = []

const color = {
    on: 0xFFFFFF,
    off: 0x777777,
}

const tokenStyle = new PIXI.TextStyle({
    font: '24px Arial',
    fill: color.on,
    align: 'center',
})

export function initTokens() {

    const tokens = new PIXI.Graphics()
    tokens.interactiveChildren = false
    stage = s.pixi.addChild(tokens)

    const gap = 2
    min = Math.pow(s.distance * 2 - gap, 2)
    max = Math.pow(s.distance * 2 + gap, 2)

    // Filter active tokens

    const limit = .01
    links = s.links.filter(l => l.value > limit)

    // Create PIXI.Text
    
    links.forEach(link => {
            const [key, value] = Object.entries(link.tokens)[0]
            const scale = value * .0007
            link.txt = new PIXI.BitmapText(key, tokenStyle)
            link.txt.scale.set(scale)
            link.txt.position.set(Infinity, Infinity)
            stage.addChild(link.txt)
        })

}

export function drawTokens() {

    links.forEach(link => {

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        const txt = link.txt

        if (min < distance && distance < max) {
            const x = deltaX / 2 + Math.min(link.source.x, link.target.x)
            const y = deltaY / 2 + Math.min(link.source.y, link.target.y)
            txt.position.set(x - txt.width / 2, y - txt.height / 2)
        } else {
            txt.position.set(Infinity, Infinity)
        }

        if (s.tokens.includes(link.txt.text)) {
            link.txt.tint = color.on
        }
        else {
            link.txt.tint = color.off
        }

    })

}