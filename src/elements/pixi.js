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

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: .3, maxScale: 5 })
        .setTransform( window.innerWidth / 2, window.innerHeight / 2, .3, .3)
        
    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })
        
}