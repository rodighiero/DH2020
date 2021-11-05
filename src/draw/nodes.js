import { BitmapText, Circle, Graphics, Point } from 'pixi.js'

import { click } from '../interface/click'

const splitInTwo = string => {
    const middle = Math.round(string.length / 2)
    for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
        if (string[i] === ' ') return [string.substring(0, i), string.substring(i + 1)]
        if (string[j] === ' ') return [string.substring(0, j), string.substring(j + 1)]
    }
    return [string, '']
}

const color = {
    on: 0xFEDD00,
    off: 0xcFFFFFF,
}


export default (data) => {

    const stage = new Graphics()
    stage.alpha = 0
    stage.name = 'nodes'
    s.viewport.addChild(stage)

    data.forEach((node, index) => {

        // Circle

        // const size = .5

        // node.circle = new Graphics()
        // node.circle.beginFill(color.off, 1)
        // node.circle.drawCircle(0, 0, size)
        // node.circle.endFill()
        // node.circle.position = new Point(node[0], node[1])
        // node.circle.hitArea = new Circle(0, 0, s.distance)
        // node.circle.interactive = true

        // stage.addChild(node.circle)

        // Label

        const scale = .2
        const [nA, nB] = splitInTwo(data[index][3])

        node.text = new BitmapText(
            `${nA}\n${nB}`,
            {
                fontName: 'Lato',
                fontSize: '9',
                // fill: color.off,
                align: 'center',
            })

        node.text.scale.set(scale)
        node.text.position.set(node[0] - node.text.width / 2, node[1] - 2.5)

        stage.addChild(node.text)

        // Interactions

        // node.circle.buttonMode = true

        // node.circle.click = mouseData => {

        //     // On click

        //     click(node)

        //     // Switch off nodes

        //     s.nodes.forEach(node => {
        //         node.circle.tint = 0xFFFFFF
        //         node.text.tint = 0xFFFFFF
        //         node.text.fill = 0xcFFFFFF
        //     })

        //     // Switch on nodes

        //     s.nodes.filter(peer => node.peers.includes(peer.id))
        //         .forEach(node => {
        //             node.circle.tint = color.on
        //             node.text.tint = color.on
        //         })
        // }


    })

}