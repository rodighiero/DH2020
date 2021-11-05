import { Graphics, Loader, Point, Sprite } from 'pixi.js'
import { extent, polygonHull, polygonCentroid } from 'd3'

function importAll(r) {
    return r.keys().map(r)
}
const images = importAll(require.context('../data/wordclouds', false, /\.(png|jpe?g|svg)$/))

export default (data, clusters) => {


    const stage = new Graphics()
    stage.interactiveChildren = false
    stage.name = 'clusters'
    s.viewport.addChild(stage)

    const loader = Loader.shared

    clusters.forEach((cluster, index) => {
        loader.add('index_' + index, images[index].default)
    })


    Object.values(clusters).forEach((cluster, index) => {

        // console.log(index, cluster)

        const coordinates = cluster.map(index => [data[index][0], data[index][1]])

        // const polygon = polygonHull(coordinates)
        // stage.lineStyle(.2, 0xFFFFFF)
        // stage.beginFill(0xFFFFFF, .1)
        // polygon.forEach((p, i) => (i == 0) ? stage.moveTo(p[0], p[1]) : stage.lineTo(p[0], p[1]))
        // stage.closePath()
        // const center = polygonCentroid(polygon)

        const extX = extent(coordinates, d => d[0]), extY = extent(coordinates, d => d[1])
        const width = extX[1] - extX[0], height = extY[1] - extY[0]

        loader.load((loader, resources) => {
            const texture = resources['index_' + index].texture
            const wc = new Sprite(texture)
            const scale = 1.5
            wc.width = width * scale
            wc.height = height * scale
            wc.x = extX[0] - (width * scale - width) / 2
            wc.y = extY[0] - (height * scale - height) / 2
            stage.addChild(wc)
        })

    })

}