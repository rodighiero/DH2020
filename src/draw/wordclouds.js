import * as PIXI from 'pixi.js'

const body = document.getElementsByTagName('body')[0]

const tokenStyle = new PIXI.TextStyle({
    font: '4px Arial',
    align: 'center',
})
const color = 0x636d60

export default () => {

    const graphic = new PIXI.Graphics()
    graphic.alpha = 0
    graphic.interactiveChildren = false
    const stage = s.pixi.addChild(graphic)

    const spriteSize = 50
    const gap = 2
    const min = Math.pow(s.distance * 2 - gap, 2)
    const max = Math.pow(s.distance * 2 + gap, 2)

    const lineHeight = 6
    const items = 3

    s.triplets.forEach(triplet => {

        const tokens = triplet.tokens.slice(0, items)
        const offsetY = lineHeight * tokens.length / 2
        const x = triplet.position[0]
        const y = triplet.position[1]

        tokens.forEach(([key, value], i) => {

            const scale = 1.4
            const text = new PIXI.BitmapText(key, tokenStyle)
            text.tint = color
            text.scale.set(scale)
            text.position.set(x - text.width / 2, y - offsetY + lineHeight * i)
            stage.addChild(text)

        })




    })

}