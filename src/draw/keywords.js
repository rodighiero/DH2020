import * as PIXI from 'pixi.js'

let stage, min, max
let links = []

const tokenStyle = new PIXI.TextStyle({
    font: '24px Arial',
    align: 'center',
})
const color = 0xc7d1c2

export default () => {

    const tokens = new PIXI.Graphics()
    tokens.interactiveChildren = false
    stage = s.pixi.addChild(tokens)

    const gap = 2
    min = Math.pow(s.distance * 2 - gap, 2)
    max = Math.pow(s.distance * 2 + gap, 2)

    // Create PIXI.Text

    s.links.forEach(link => {

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)

        if (min < distance && distance < max) {

            const [key, value] = Object.entries(link.tokens)[0]
            // const scale = Math.log(value) * .5
            const scale = value * .09
            const x = deltaX / 2 + Math.min(link.source.x, link.target.x)
            const y = deltaY / 2 + Math.min(link.source.y, link.target.y)

            link.txt = new PIXI.BitmapText(key, tokenStyle)
            link.txt.tint = color
            link.txt.scale.set(scale)
            link.txt.position.set(x - link.txt.width / 2, y - link.txt.height / 2)

            // Check overlapping

            let overlapping = false

            s.links.filter(l => l.txt).forEach(link2 => {
                if (link.index == link2.index) return
                const l1 = link.txt
                const l2 = link2.txt
                if (!(l2.x > l1.x + l1.width || l2.x + l2.width < l1.x || l2.y > l1.y + l1.height || l2.y + l2.height < l1.y))
                    overlapping = true
            })

            if (!overlapping)
                stage.addChild(link.txt)
        }

    })

}
