const backgroundMusic = new Audio('../../assets/sounds/01-Inspiring-Upbeat-Ambient-Full-Track.mp3')

const pieceSoundEffect = new Audio('../../assets/sounds/piece-sound-effect.mp3')

function playBGM() {
  backgroundMusic.play()
  backgroundMusic.loop = true
  backgroundMusic.volume = 0.05
}

function muteBGM() {
  if (backgroundMusic.volume > 0) {
    backgroundMusic.volume = 0
  } else {
    backgroundMusic.volume = 0.05
  }
}

function playPieceSFX() {
  pieceSoundEffect.volume = 0.5
  pieceSoundEffect.play()
}

export {
  playBGM,
  muteBGM,
  playPieceSFX
}