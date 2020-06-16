import * as PIXI from 'pixi.js'

let stage

export function initLinks() {

    const links = new PIXI.Graphics()
    links.interactiveChildren = false
    stage = s.pixi.addChild(links)

}

export function drawLinks() {

    stage.clear()
    stage.alpha = .2

    s.links.forEach(({ source, target, value }) => {
        stage.lineStyle(value, 0xCCCCCC)
        stage.moveTo(source.x, source.y)
        stage.lineTo(target.x, target.y)
    })

}