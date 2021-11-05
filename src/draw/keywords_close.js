import { BitmapText, Graphics } from 'pixi.js'

export default (pairs) => {

    const stage = new Graphics()
    stage.alpha = 0
    stage.name = 'keywords_close'
    stage.interactiveChildren = false
    s.viewport.addChild(stage)

    const lineHeight = .8
    const items = 3

    pairs.forEach(p => {

        const lemmas = p[2]
        const offsetY = lineHeight * (lemmas.length - 1) / 2

        const x = p[0]
        const y = p[1]

        lemmas.forEach((lemma, i) => {
            const text = new BitmapText(
                lemma,
                {
                    fontName: 'Lato',
                    fontSize: '.7',
                    tint: 0xFFFFFF,
                    align: 'center',
                })

            text.position.set(x - text.width / 2, y - offsetY + lineHeight * i)
            stage.addChild(text)
        })

    })

}