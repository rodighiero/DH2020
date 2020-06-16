import * as PIXI from 'pixi.js'

let stage

const color = 0x8a8201

export function initContours() {

    const contours = new PIXI.Graphics()
    contours.interactiveChildren = false
    stage = s.pixi.addChild(contours)

}

export function drawContours() {

    stage.clear()
    const extX = d3.extent(s.nodes, d => d.x)
    const extY = d3.extent(s.nodes, d => d.y)
    const width = extX[1] - extX[0]
    const height = extY[1] - extY[0]
    const x = extX[0]
    const y = extY[0]


    const density = d3.contourDensity()
        .x(d => d.x - x)
        .y(d => d.y - y)
        .weight(d => d.relevancy)
        .size([width, height])
        .cellSize(10)
        .bandwidth(40)
        .thresholds(15)
        (s.nodes)

    density.forEach(d => d.coordinates = d.coordinates
        .map(d => d.map(d => d.map(d => [d[0] + x, d[1] + y]))))

    const contourWidth = 2
    const step = contourWidth / density.length
    let count = 1

    for (let i = density.length - 1; i >= 0; i--) {

        const width = contourWidth - step * count
        stage.lineStyle(width, color)
        count = count + 1

        density[i].coordinates.forEach(array => {
            array.forEach(array => {
                array.forEach(([x, y], i) => {
                    if (i == 0) stage.moveTo(x, y)
                    stage.lineTo(x, y)
                })
            })
            stage.closePath()
        })

    }

}