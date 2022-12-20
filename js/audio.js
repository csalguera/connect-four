const backgroundMusic = new Audio('../../assets/sounds/01-Inspiring-Upbeat-Ambient-Full-Track.mp3')

function playBGM() {
  backgroundMusic.volume = 0.05
  backgroundMusic.play()
}

export {
  playBGM
}