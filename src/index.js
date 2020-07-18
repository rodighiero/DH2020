// CSS

import '../node_modules/normalize.css/normalize.css'
import './constant/index.css'

// Libraries

import * as d3 from 'd3'
import * as PIXI from 'pixi.js'

// Data

import nodesJSON from './data/nodes.json'
import linksJSON from './data/links.json'
import tripletsJSON from './data/triplets.json'
import arialXML from './constant/arial.xml'
import arialDataPNG from './constant/arial.png'

import search from './elements/search'
import stats from './elements/stats'

// Init

import pixi from './elements/pixi.js'
import fps from './elements/fps.js'

import background from './draw/background'
import contours from './draw/contours.js'
import keywords from './draw/keywords.js'
import links from './draw/links.js'
import nodes from './draw/nodes.js'
import wordclouds from './draw/wordclouds.js'

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
    d3.json(tripletsJSON),
    d3.xml(arialXML)

]).then(([nodesData, linksData, tripletsData, arialXML]) => {

    s.links = linksData
    s.nodes = nodesData
    s.triplets = tripletsData
    console.log('nodes', s.nodes.length)
    console.log('links', s.links.length)
    console.log('triplets', s.triplets.length)

    pixi()

    const arialPNG = PIXI.Texture.from(arialDataPNG)
    const arial = PIXI.BitmapText.registerFont(arialXML, arialPNG)

    fps()

    // background()
    links()
    contours()
    keywords()
    nodes()
    wordclouds()

    search()

    window.onresize = function () {
        s.pixi.resize()
    }

    // }

})