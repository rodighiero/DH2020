import * as PIXI from 'pixi.js'

PIXI.BitmapFont.from('TripletFont', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0x636d60,
})

export default () => {

    const graphic = new PIXI.Graphics()
    graphic.alpha = 0
    graphic.interactiveChildren = false
    const stage = s.pixi.addChild(graphic)

    const lineHeight = 5
    const items = 3

    s.triplets.forEach(triplet => {

        const tokens = triplet.tokens.slice(0, items)
        const offsetY = lineHeight * tokens.length / 2
        const x = triplet.position[0]
        const y = triplet.position[1]

        tokens.forEach(([key, value], i) => {

            const scale = .16   
            const text = new PIXI.BitmapText(key, { fontName: 'TripletFont' })
            text.align = 'center'
            text.scale.set(scale)
            text.position.set(x - text.width / 2, y - offsetY + lineHeight * i)
            stage.addChild(text)

        })

    })

}