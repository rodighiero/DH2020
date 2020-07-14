import * as PIXI from 'pixi.js'

export default () => {
    const links = new PIXI.Graphics()
    links.interactiveChildren = false
    const stage = s.pixi.addChild(links)

    stage.alpha = .2

    s.links.forEach(({ source, target, value }) => {

        stage.lineStyle(value, 0x444444)
        stage.moveTo(source.x, source.y)
        stage.lineTo(target.x, target.y)

    })

}