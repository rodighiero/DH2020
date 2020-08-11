import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import arialDataPNG from '../constant/arial.png'
import { scaleLinear } from 'd3-scale'
import { extent } from "d3-array"


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
    document.body.append(app.view)

    // Font

    const arialPNG = PIXI.Texture.from(arialDataPNG)
    PIXI.BitmapFont.install(arialXML, arialPNG)

    // Create and append viewport

    s.pixi = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction
    })
    app.stage.addChild(s.pixi)

    // Set scales

    const extX = extent(s.nodes, d => d.x)
    const extY = extent(s.nodes, d => d.y)
    const width = extX[1] - extX[0]
    const height = extY[1] - extY[0]
    const scaleX = window.innerWidth / width
    const scaleY = window.innerHeight / height
    const scale = scaleX < scaleY ? scaleX : scaleY
    const zoomMin = scale
    const zoomMax = 3

    // Set vieport

    s.pixi
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: zoomMin, maxScale: zoomMax })
        .setTransform(window.innerWidth / 2, window.innerHeight / 2, scale, scale)

    // Transparency on zoom
    // 0. Background 1. Links 2. Contours 3. Keywords 4. Nodes 5. Wordclouds

    const zoomOut = scaleLinear().domain([zoomMin, 2]).range([1, 0])
    const zoomIn = scaleLinear().domain([zoomMin, 2]).range([0, 1])

    s.pixi.on('zoomed', e => {
        const scale = e.viewport.lastViewport.scaleX
        e.viewport.children[2].alpha = zoomOut(scale)
        e.viewport.children[3].alpha = zoomOut(scale)
        e.viewport.children[5].alpha = zoomIn(scale)
    })

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

}