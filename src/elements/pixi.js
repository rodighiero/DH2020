import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

export default () => {

    // Create and append PIXI

    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
        resizeTo: window,
    })
    document.body.prepend(app.view)

    s.app = app

    // arial = new s.pixi.BitmapFont.install(arialXML, arialPNG)


    // Create and append viewport

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction
    })
    app.stage.addChild(viewport)

    s.pixi = viewport

    // Activate plugins

    const zoomMin = .3
    const zoomMax = 1
    const transparencyScale = d3.scaleLinear()
        .domain([zoomMin, zoomMax])
        .range([1, 0])

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: zoomMin, zoomMax: zoomMax })
        .setTransform(window.innerWidth / 2, window.innerHeight / 2, zoomMin, zoomMin)

    viewport.on('zoomed', e => {
        // console.log(e.viewport.children[2])
        // console.log(e.viewport.lastViewport.scaleX)
        const alpha = transparencyScale(e.viewport.lastViewport.scaleX)
        console.log(alpha)
        e.viewport.children[4].alpha = alpha
    })

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

}