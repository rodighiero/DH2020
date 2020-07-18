
import * as PIXI from 'pixi.js'

export default () => {

    const size = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    const gradient = context.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
    )

    gradient.addColorStop(1, d3.rgb(0, 0, 0))
    gradient.addColorStop(0, d3.rgb(50, 50, 50))

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    let texture = PIXI.Texture.from(canvas)
    let sprite = new PIXI.Sprite(texture)
    sprite.width = size
    sprite.height = size
    sprite.position = new PIXI.Point(-size / 2, -size / 2)
    // link.tokens = sprite

    // const background = new PIXI.Graphics()
    const stage = s.pixi.addChild(sprite)

}