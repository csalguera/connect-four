const backgroundMusic = new Audio('../../assets/sounds/01-Inspiring-Upbeat-Ambient-Full-Track.mp3')

const pieceSoundEffect = new Audio('../../assets/sounds/piece-sound-effect.mp3')

function playBGM() {
  backgroundMusic.volume = 0.05
  backgroundMusic.play()
}

function playPieceSFX() {
  pieceSoundEffect.volume = 0.5
  pieceSoundEffect.play()
}

export {
  playBGM,
  playPieceSFX
}