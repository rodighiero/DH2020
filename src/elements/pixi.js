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
    const zoomMax = 5

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: zoomMin, zoomMax: zoomMax })
        .setTransform(window.innerWidth / 2, window.innerHeight / 2, zoomMin, zoomMin)

    // Transparency on zoom

    const keywords = d3.scaleLinear()
        .domain([zoomMin, 2]).range([1, 0])

    const wordcloud = d3.scaleLinear()
        .domain([zoomMin, 2]).range([0, 1])

    const contours = d3.scaleLinear()
        .domain([zoomMin, 2]).range([1, 0])

    viewport.on('zoomed', e => {
        const scale = e.viewport.lastViewport.scaleX
        // 0. Links and 3. Nodes
        e.viewport.children[1].alpha = contours(scale)
        e.viewport.children[2].alpha = keywords(scale)
        e.viewport.children[4].alpha = wordcloud(scale)
    })

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

}