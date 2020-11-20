const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const person = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()
const flight = new Audio()
const scoreAudio = new Audio()
const bgAudio = new Audio()

person.src = 'images/ufo2.png'
bg.src = 'images/bg.png'
fg.src = 'images/fg.png'
pipeUp.src = 'images/pipeUp.png'
pipeBottom.src = 'images/pipeBottom.png'
flight.src = 'audio/fly.mp3'
scoreAudio.src = 'audio/score.mp3'
bgAudio.src = 'audio/bg.mp3'

document.addEventListener('keydown', moveUp)

const pipe = []
pipe[0] = {
  x: canvas.width,
  y: 0,
}

let score = 0
const gap = 200
let xPos = 10
let yPos = 120
const gravitation = 1

function draw () {
  ctx.drawImage(bg,0,0)

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y)
    ctx.drawImage(pipeBottom,pipe[i].x,pipe[i].y + pipeUp.height + gap)
    pipe[i].x--

    if(pipe[i].x === 150) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      })
    }

    if(xPos + person.width >= pipe[i].x
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
        || yPos + person.height >= pipe[i].y +pipeUp.height + gap)
        || yPos + person.height >= canvas.height - fg.height) {
      location.reload()
    }

    if (pipe[i].x === 5) {
      score++
      scoreAudio.play()
    }
  }

  ctx.drawImage(fg,0,canvas.height -fg.height)
  ctx.drawImage(person, xPos, yPos)
  yPos += gravitation
  ctx.fillStyle = '#ffffff'
  ctx.font = '20px Roboto'
  ctx.fillText(`Score: ${score}`,10,canvas.height - 20)
  bgAudio.play()
  requestAnimationFrame(draw)
}

pipeBottom.onload = draw;

function moveUp () {
  yPos -=30
  flight.play()
}
