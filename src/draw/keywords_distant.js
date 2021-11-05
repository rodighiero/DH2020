import { BitmapText, Graphics } from 'pixi.js'
import { max } from 'd3'

let index = []

export default () => {

    console.log()


    const stage = new Graphics()
    stage.name = 'keywords_distant'
    stage.interactiveChildren = false
    s.viewport.addChild(stage)

    const maxValue = max(s.triplets.map(t => t.tfidf[0][1]))

    // Make visible the first one
    let visibleTokens = []

    s.triplets
        // .filter(t => t.tfidf[0][1] < maxValue * .3)
        .forEach(triplet => {

            // console.log(triplet)

            const token = triplet.tfidf.slice(0, 1)
            const x = triplet.position[0]
            const y = triplet.position[1]

            const text = new BitmapText(
                token[0][0],
                {
                    fontName: 'Lato',
                    fontSize: '64',
                    fill: 0xFEDD00,
                    align: 'center',
                })

            const value = token[0][1]
            const base = 100
            const magnitude = .003
            text.scale.set((value + base) * magnitude)

            text.position.set(x - text.width / 2, y - text.height / 2)

            // Check overlapping

            let overlapping = false

            for (var i = 0; i < index.length; i++) {

                const l1 = index[i]
                const l2 = text
                const margin = 5 // Important to correct shorter height

                if (!(l2.x > l1.x + l1.width + margin
                    || l2.x + l2.width + margin < l1.x
                    || l2.y > l1.y + l1.height + margin
                    || l2.y + l2.height + margin < l1.y)) {
                    overlapping = true
                    break
                }

            }

            if (!overlapping) {

                // if (visibleTokens.includes(token[0][0]))
                //     return
                // else
                //     visibleTokens.push(token[0][0])

                stage.addChild(text)
                index.push(text)

                // draw rectangle to check overlapping

                // const graphics = new PIXI.Graphics();
                // graphics.lineStyle(2, 0xFF00FF, 1)
                // graphics.beginFill(0x650A5A, 0.25)
                // graphics.drawRoundedRect(link.txt.x, link.txt.y, link.txt.width, link.txt.height, 5)
                // graphics.endFill()
                // stage.addChild(graphics)
            }

        })

}
