// CSS

import '../node_modules/normalize.css/normalize.css'
import './index.css'

// Libraries

import * as d3 from 'd3'
import * as PIXI from 'pixi.js'

// Data

import nodesJSON from './data/nodes.json'
import linksJSON from './data/links.json'
import arialXML from './arial.xml'
import arialDataPNG from './arial.png'

import search from './search'
import stats from './stats'

// Init

import pixi from './elements/pixi.js'
import fps from './elements/fps.js'

import background from './elements/background'
import contours from './elements/contours.js'
import links from './elements/links.js'
import nodes from './elements/nodes.js'
import tokens from './elements/tokens.js'

// Global variables

window.d3 = d3

window.s = {
    distance: 40,
    links,
    nodes,
    tokens: []
}

// Start

Promise.all([
    d3.json(nodesJSON),
    d3.json(linksJSON),
    d3.xml(arialXML)

]).then(([nodesData, linksData, arialXML]) => {

    s.links = linksData
    s.nodes = nodesData
    console.log('nodes', s.nodes.length)
    console.log('links', s.links.length)

    pixi()

    const arialPNG = PIXI.Texture.from(arialDataPNG)
    const arial = PIXI.BitmapText.registerFont(arialXML, arialPNG)

    fps()

    // background()
    links()
    contours()
    tokens()
    nodes()

    search()

    window.onresize = function () {
        s.pixi.resize()
    }

    // }

})