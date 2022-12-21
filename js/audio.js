const backgroundMusic = new Audio('../../assets/sounds/01-Inspiring-Upbeat-Ambient-Full-Track.mp3')

const clickSound = new Audio('../../assets/sounds/Click Sound.mp3')

const hoverSound = new Audio('../../assets/sounds/Hover Sound.mp3')

const resetSound = new Audio('../../assets/sounds/Reset Sound.mp3')

function playBGM() {
  backgroundMusic.play()
  backgroundMusic.loop = true
  backgroundMusic.volume = 0.02
}

function muteBGM() {
  if (backgroundMusic.volume > 0) {
    backgroundMusic.volume = 0
  } else {
    backgroundMusic.volume = 0.02
  }
}

function playClick() {
  clickSound.volume = 0.5
  clickSound.play()
}

function muteClick() {
  if (clickSound.volume > 0) {
    clickSound.volume = 0
  } else {
    clickSound.volume = 0.05
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

function playReset() {
  resetSound.volume = 1
  resetSound.play()
}

function muteReset() {
  if (resetSound.volume > 0) {
    resetSound.volume = 0
  } else {
    resetSound.volume = 1
  }
}

export {
  playBGM,
  muteBGM,
  playClick,
  muteClick,
  playHover,
  muteHover,
  playReset,
  muteReset
}