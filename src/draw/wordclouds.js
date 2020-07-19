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

    s.triplets.forEach(triplet => {

        const items = 3
        const tokens = triplet.tokens.slice(0, items)
        const x = triplet.position[0]
        const y = triplet.position[1]

        let counter = 0

        tokens.forEach( ([key, value], i) => {

            // const scale = Math.log(value) * .07
            const scale = 1.4
            const text = new PIXI.BitmapText(key, tokenStyle)
            text.tint = color
            text.scale.set(scale)
            text.position.set(x - text.width / 2, y - text.height / 2 + i * 6 - 3)
            stage.addChild(text)
            
        })



        
    })

}