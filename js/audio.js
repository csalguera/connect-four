const backgroundMusic = new Audio('../../assets/sounds/01-Inspiring-Upbeat-Ambient-Full-Track.mp3')

const pieceSoundEffect = new Audio('../../assets/sounds/piece-sound-effect.mp3')

const hoverSound = new Audio('../../assets/sounds/Hover Sound.mp3')

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

function playClick() {
  pieceSoundEffect.volume = 0.5
  pieceSoundEffect.play()
}

function muteClick() {
  if (pieceSoundEffect.volume > 0) {
    pieceSoundEffect.volume = 0
  } else {
    pieceSoundEffect.volume = 0.05
  }
}

function playHover() {
  hoverSound.volume = 0.05
  hoverSound.play()
  hoverSound.currentTime = 0
}

function muteHover() {
  if (hoverSound.volume > 0) {
    hoverSound.volume = 0
  } else {
    hoverSound.volume = 0.05
  }
}

export {
  playBGM,
  muteBGM,
  playClick,
  muteClick,
  playHover,
  muteHover
}