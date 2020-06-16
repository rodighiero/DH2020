export default () => {

    const canvas = document.querySelector('canvas#background')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const body = document.querySelector('body')
    body.prepend(canvas)

    const context = canvas.getContext('2d', { alpha: false })

    const gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    )

    gradient.addColorStop(1, d3.rgb(0, 0, 0))
    gradient.addColorStop(0, d3.rgb(50, 50, 50))

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

}