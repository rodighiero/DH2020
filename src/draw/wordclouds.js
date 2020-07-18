import * as PIXI from 'pixi.js'
import * as WordCloud from 'wordcloud'

const body = document.getElementsByTagName('body')[0]

const options = {
    gridSize: 2,
    weightFactor: 4,
    fontFamily: 'Arial, sans-serif',
    color: '#666',
    backgroundColor: 'transparent',
    rotateRatio: 0,
    // minSize: 12,
}

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

        const canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 200

        options.list = triplet.tokens.slice(0, 3)

        WordCloud(canvas, options)
        
        canvas.addEventListener('wordcloudstop', obj => {

            const x = triplet.position[0]
            const y = triplet.position[1]

            const canvas = obj.path[0]
            let texture = PIXI.Texture.from(canvas)
            let sprite = new PIXI.Sprite(texture)
            sprite.width = spriteSize
            sprite.height = spriteSize
            sprite.position = new PIXI.Point(x - spriteSize / 2, y - spriteSize / 2)
            stage.addChild(sprite)
        })

    })

    console.log('Loaded')

}