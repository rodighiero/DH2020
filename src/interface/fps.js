import fps from 'fps'

export default () => {

    // Ticker

    const ticker = fps({
        every: 1
    })

    setInterval(() => {
        ticker.tick()
    }, 1000 / 60)

    const element = document.getElementById('fps')

    ticker.on('data', function (framerate) {
        element.innerHTML = Math.floor(parseInt(framerate))
    })

}