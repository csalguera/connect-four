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

function playSFX() {
  pieceSoundEffect.volume = 0.5
  pieceSoundEffect.play()
}

function muteSFX() {
  if (pieceSoundEffect.volume > 0) {
    pieceSoundEffect.volume = 0
  } else {
    pieceSoundEffect.volume = 0.05
  }
}

export {
  playBGM,
  muteBGM,
  playSFX,
  muteSFX
}