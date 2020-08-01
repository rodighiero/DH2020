import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import arialDataPNG from '../constant/arial.png'

export default (arialXML) => {

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

    const arialPNG = PIXI.Texture.from(arialDataPNG)
    const arial = PIXI.BitmapFont.install(arialXML, arialPNG)

    // Create and append viewport

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction
    })
    app.stage.addChild(viewport)

    s.pixi = viewport
    
    // Activate

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

    const links = 1
    const contours = d3.scaleLinear().domain([zoomMin, 2]).range([1, 0])
    const couples = d3.scaleLinear().domain([zoomMin, 2]).range([1, 0])
    const nodes = 1
    const triplets = d3.scaleLinear().domain([zoomMin, 2]).range([0, 1])

    viewport.on('zoomed', e => {
        const scale = e.viewport.lastViewport.scaleX
        e.viewport.children[0].alpha = links
        e.viewport.children[1].alpha = contours(scale)
        e.viewport.children[2].alpha = couples(scale)
        e.viewport.children[3].alpha = nodes
        e.viewport.children[4].alpha = triplets(scale)
    })

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

}