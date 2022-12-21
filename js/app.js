// Constants ---------------------------------------------------------------
import * as allAudio from './audio.js'

const winningCombos = [
  // Row 1: Horizontal Combos
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  // Row 2: Horizontal Combos
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  // Row 3: Horizontal Combos
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  // Row 4: Horizontal Combos
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  // Row 5: Horizontal Combos
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  // Row 6: Horizontal Combos
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  // Column 1: Vertical Combos
  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],
  // Column 2: Vertical Combos
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [15, 22, 29, 36],
  // Column 3: Vertical Combos
  [2, 9, 16, 23],
  [9, 16, 23, 30],
  [16, 23, 30, 37],
  // Column 4: Vertical Combos
  [3, 10, 17, 24],
  [10, 17, 24, 31],
  [17, 24, 31, 38],
  // Column 5: Vertical Combos
  [4, 11, 18, 25],
  [11, 18, 25, 32],
  [18, 25, 32, 39],
  // Column 6: Vertical Combos
  [5, 12, 19, 26],
  [12, 19, 26, 33],
  [19, 26, 33, 40],
  // Column 7: Vertical Combos
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],
  // 14 - 38 Diagonal Combo(s)
  [14, 22, 30, 38],
  // 7 - 39 Diagonal Combo(s)
  [7, 15, 23, 31],
  [15, 23, 31, 39],
  // 0 - 40 Diagonal Combo(s)
  [0, 8, 16, 24],
  [8, 16, 24, 32],
  [16, 24, 32, 40],
  // 1 - 41 Diagonal Combo(s)
  [1, 9, 17, 25],
  [9, 17, 25, 33],
  [17, 25, 33, 41],
  // 2 - 34 Diagonal Combo(s)
  [2, 10, 18, 26],
  [10, 18, 26, 34],
  // 3 - 27 Diagonal Combo(s)
  [3, 11, 19, 27],
  // 20 - 38 Diagonal Combo(s)
  [20, 26, 32, 38],
  // 13 - 37 Diagonal Combo(s)
  [13, 19, 25, 31],
  [19, 25, 31, 37],
  // 6 - 36 Diagonal Combo(s)
  [6, 12, 18, 24],
  [12, 18, 24, 30],
  [18, 24, 30, 36],
  // 5 - 35 Diagonal Combo(s)
  [5, 11, 17, 23],
  [11, 17, 23, 29],
  [17, 23, 29, 35],
  // 4 - 28 Diagonal Combo(s)
  [4, 10, 16, 22],
  [10, 16, 22, 28],
  // 3 - 21 Diagonal Combo(s)
  [3, 9, 15, 21]
]
// Cached Element References -----------------------------------------------
const gridEls = document.querySelectorAll('.gr')
const messageEl = document.querySelector('#message')
const resetBtn = document.querySelector('#reset-btn')
const player1Score = document.querySelector('#p1Sc')
const player2Score = document.querySelector('#p2Sc')
const musicBtn = document.querySelector('#music-button')
const sfxBtn = document.querySelector('#sfx-button')
// Variables ---------------------------------------------------------------
let winner
let tie 
let turn
let grid
let p1Score = 0
let p2Score = 0
let clickDisable = false
let sfxMuted = false
// Event Listeners ---------------------------------------------------------
gridEls.forEach(gr => gr.addEventListener('click', handleClick))
resetBtn.addEventListener('click', init)
resetBtn.addEventListener('mousedown', changeResetBtnStyle)
musicBtn.addEventListener('click', controlMusic)
sfxBtn.addEventListener('click', sfxStatus)
// Functions ---------------------------------------------------------------

init()

function init() {
  winner = false
  tie = false
  turn = 1
  grid = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null
  ]
  render()
}

function render() {
  updateGrid()
  updateMessage()
  updateScore()
  updateResetBtn()
  updateGridClass()
}

function updateGrid() {
  grid.forEach((val, idx) => {
    if (!val) {
      gridEls[idx].style.background = ''
    } else if (val === 1) {
      gridEls[idx].style.background = 'red'
    } else if (val === -1) {
      gridEls[idx].style.background = 'black'
    }
  })
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `It is ${turn === 1 ? 'Player 1' : 'Player 2'}'s turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `Bummer! There is no winner this time.`
  } else {
    messageEl.textContent = `Congratulations ${turn === 1 ? 'Player 1' : 'Player 2'}! You won!`
  }
}

function updateScore() {
  if (winner) {
    turn === 1 ? player1Score.textContent = `Player 1 Score: ${p1Score += 1}` : player2Score.textContent = `Player 2 Score: ${p2Score += 1}`
  }
}

function updateResetBtn() {
  if (!winner && !tie) {
    resetBtn.style.visibility = 'hidden'
  } else {
    resetBtn.style.visibility = 'visible'
  }
}

function updateGridClass() {
  if (winner || tie) {
    gridEls.forEach(gr => {
      gr.classList.remove('fall-1')
      gr.classList.remove('fall-2')
      gr.classList.remove('fall-3')
      gr.classList.remove('fall-4')
      gr.classList.remove('fall-5')
      gr.classList.remove('fall-6')
    })
  }
}

function handleClick(evt) {
  if (!clickDisable) {
    clickDisable = true
    const grIdx = parseInt(evt.target.id.replace('gr', ''))
    if (winner || tie) return
    placePiece(grIdx)
    animatePiece(grIdx)
    if (!sfxMuted) {
      allAudio.playSFX()
    } else {
      allAudio.muteSFX()
    }
    checkForTie()
    checkForWinner()
    switchPlayerTurn(grIdx)
    setTimeout(clickEnable, 600)
    render()
  }
}

function clickEnable() {
  clickDisable = false
}

function animatePiece(idx) {
  if (idx <= 6) animateFromRow1(idx)
  if (idx >= 7 && idx <= 13) animateFromRow2(idx)
  if (idx >= 14 && idx <= 20) animateFromRow3(idx)
  if (idx >= 21 && idx <= 27) animateFromRow4(idx)
  if (idx >= 28 && idx <= 34) animateFromRow5(idx)
  if (idx >= 35) animateFromRow6(idx)
}

function animateFromRow1(idx) {
  if (grid[idx + 35] && !grid[idx + 28]) {
    gridEls[idx + 35].classList.add('fall-6')
  } else if (grid[idx + 28] && !grid[idx + 21]) {
    gridEls[idx + 28].classList.add('fall-5')
  } else if (grid[idx + 21] && !grid[idx + 14]) {
    gridEls[idx + 21].classList.add('fall-4')
  } else if (grid[idx + 14] && !grid[idx + 7]) {
    gridEls[idx + 14].classList.add('fall-3')
  } else if (grid[idx + 7] && !grid[idx]) {
    gridEls[idx + 7].classList.add('fall-2')
  } else if (grid[idx]) {
    gridEls[idx].classList.add('fall-1')
  }
}

function animateFromRow2(idx) {
  if (grid[idx + 28] && !grid[idx + 21]) {
    gridEls[idx + 28].classList.add('fall-6')
  } else if (grid[idx + 21] && !grid[idx + 14]) {
    gridEls[idx + 21].classList.add('fall-5')
  } else if (grid[idx + 14] && !grid[idx + 7]) {
    gridEls[idx + 14].classList.add('fall-4')
  } else if (grid[idx + 7] && !grid[idx]) {
    gridEls[idx + 7].classList.add('fall-3')
  } else if (grid[idx] && !grid[idx - 7]) {
    gridEls[idx].classList.add('fall-2')
  } else if (grid[idx - 7]) {
    gridEls[idx - 7].classList.add('fall-1')
  }
}

function animateFromRow3(idx) {
  if (grid[idx + 21] && !grid[idx + 14]) {
    gridEls[idx + 21].classList.add('fall-6')
  } else if (grid[idx + 14] && !grid[idx + 7]) {
    gridEls[idx + 14].classList.add('fall-5')
  } else if (grid[idx + 7] && !grid[idx]) {
    gridEls[idx + 7].classList.add('fall-4')
  } else if (grid[idx] && !grid[idx - 7]) {
    gridEls[idx].classList.add('fall-3')
  } else if (grid[idx - 7] && !grid[idx - 14]) {
    gridEls[idx - 7].classList.add('fall-2')
  } else if (grid[idx - 14]) {
    gridEls[idx - 14].classList.add('fall-1')
  }
}

function animateFromRow4(idx) {
  if (grid[idx + 14] && !grid[idx + 7]) {
    gridEls[idx + 14].classList.add('fall-6')
  } else if (grid[idx + 7] && !grid[idx]) {
    gridEls[idx + 7].classList.add('fall-5')
  } else if (grid[idx] && !grid[idx - 7]) {
    gridEls[idx].classList.add('fall-4')
  } else if (grid[idx - 7] && !grid[idx - 14]) {
    gridEls[idx - 7].classList.add('fall-3')
  } else if (grid[idx - 14] && !grid[idx - 21]) {
    gridEls[idx - 14].classList.add('fall-2')
  } else if (grid[idx - 21]) {
    gridEls[idx - 21].classList.add('fall-1')
  }
}

function animateFromRow5(idx) {
  if (grid[idx + 7] && !grid[idx]) {
    gridEls[idx + 7].classList.add('fall-6')
  } else if (grid[idx] && !grid[idx - 7]) {
    gridEls[idx].classList.add('fall-5')
  } else if (grid[idx - 7] && !grid[idx - 14]) {
    gridEls[idx - 7].classList.add('fall-4')
  } else if (grid[idx - 14] && !grid[idx - 21]) {
    gridEls[idx - 14].classList.add('fall-3')
  } else if (grid[idx - 21] && !grid[idx - 28]) {
    gridEls[idx - 21].classList.add('fall-2')
  } else if (grid[idx - 28]) {
    gridEls[idx - 28].classList.add('fall-1')
  }
}

function animateFromRow6(idx) {
  if (grid[idx] && !grid[idx - 7]) {
    gridEls[idx].classList.add('fall-6')
  } else if (grid[idx - 7] && !grid[idx - 14]) {
    gridEls[idx - 7].classList.add('fall-5')
  }  else if (grid[idx - 14] && !grid[idx -21]) {
    gridEls[idx - 14].classList.add('fall-4')
  }  else if (grid[idx - 21] && !grid[idx - 28]) {
    gridEls[idx - 21].classList.add('fall-3')
  }  else if (grid[idx - 28] && !grid[idx - 35]) {
    gridEls[idx - 28].classList.add('fall-2')
  }  else if (grid[idx - 35]) {
    gridEls[idx - 35].classList.add('fall-1')
  }
}

function placePiece(idx) {
  if (idx <= 6) {
    placeFromRow1(idx)
  } else if (idx >= 7 && idx <= 13) {
    placeFromRow2(idx)
  } else if (idx >= 14 && idx <= 20) {
    placeFromRow3(idx)
  } else if (idx >= 21 && idx <= 27) {
    placeFromRow4(idx)
  } else if (idx >= 28 && idx <= 34) {
    placeFromRow5(idx)
  } else if (idx >= 35) {
    placeFromRow6(idx)
  }
}

function placeFromRow1(idx) {
  if (grid[idx]) return
  if (!grid[idx + 35]) {
    idx += 35
  } else if (!grid[idx + 28]) {
    idx += 28
  } else if (!grid[idx + 21]) {
    idx += 21
  } else if (!grid[idx + 14]) {
    idx += 14
  } else if (!grid[idx + 7]) {
    idx += 7
  }
  grid[idx] = turn
}

function placeFromRow2(idx) {
  if (grid[idx - 7]) return
  if (!grid[idx]) {
    if (!grid[idx + 28]) {
      idx += 28
    } else if (!grid[idx + 21]) {
      idx += 21
    } else if (!grid[idx + 14]) {
      idx += 14
    } else if (!grid[idx + 7]) {
      idx += 7
    }
    grid[idx] = turn
  } else {
    if (grid[idx] && ! grid[idx - 7]) {
      idx -= 7
    }
    grid[idx] = turn
  }
}

function placeFromRow3(idx) {
  if (grid[idx - 14]) return
  if (!grid[idx]) {
    if (!grid[idx + 21]) {
      idx += 21
    } else if (!grid[idx + 14]) {
      idx += 14
    } else if (!grid[idx + 7]) {
      idx += 7
    }
    grid[idx] = turn
  } else {
    if (grid[idx] && !grid[idx - 14]) {
      if (!grid[idx - 7]) {
        idx -= 7
      } else if (!grid[idx - 14]) {
        idx -= 14
      }
    }
    grid[idx] = turn
  }
}

function placeFromRow4(idx) {
  if (grid[idx - 21]) return
  if (!grid[idx]) {
    if (!grid[idx + 14]) {
      idx += 14
    } else if (!grid[idx + 7]) {
      idx += 7
    }
    grid[idx] = turn
  } else {
    if (grid[idx] && ! grid[idx - 21]) {
      if (!grid[idx - 7]) {
        idx -= 7
      } else if (!grid[idx - 14]) {
        idx -= 14
      } else if (!grid[idx - 21]) {
        idx -= 21
      }
    }
    grid[idx] = turn
  }
}

function placeFromRow5(idx) {
  if (grid[idx - 28]) return
  if (!grid[idx]) {
    if (!grid[idx + 7]) {
      idx += 7
    }
    grid[idx] = turn
  } else {
    if (grid[idx] && !grid[idx - 28]) {
      if (!grid[idx - 7]) {
        idx -= 7
      } else if (!grid[idx - 14]) {
        idx -= 14
      } else if (!grid[idx - 21]) {
        idx -= 21
      } else if (!grid[idx - 28]) {
        idx -= 28
      }
    }
    grid[idx] = turn
  }
}

function placeFromRow6(idx) {
  if (grid[idx - 35]) return
  if (!grid[idx]) {
    grid[idx] = turn
  } else {
    if (grid[idx] && !grid[idx - 35]) {
      if (!grid[idx - 7]) {
        idx -= 7
      } else if (!grid[idx - 14]) {
        idx -= 14
      } else if (!grid[idx - 21]) {
        idx -= 21
      } else if (!grid[idx - 28]) {
        idx -= 28
      } else if (!grid[idx - 35]) {
        idx -= 35
      }
    }
    grid[idx] = turn
  }
}

function checkForTie() {
  if (grid.some(val => !val)) {
    return
  } else {
    tie = true
  }
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    if (Math.abs(grid[combo[0]] + grid[combo[1]] + grid[combo[2]] + grid[combo[3]]) === 4) {
      winner = true
    }
  })
}

function switchPlayerTurn(idx) {
  if (winner) return
  // Prvents turn switch when column is full and Row 6 is clicked on
  if (grid[idx] && grid[idx - 35]) return
  // Prevents turn switch when column is full and Row 5 is clicked on
  if (grid[idx + 7] && grid[idx - 28]) return
  // Prevents turn switch when column is full and Row 4 is clicked on
  if (grid[idx + 14] && grid[idx - 21]) return
  // Prevents turn switch when column is full and Row 3 is clicked on
  if (grid[idx + 21] && grid[idx - 14]) return
  // Prevents turn switch when column is full and Row 2 is clicked on
  if (grid[idx + 28] && grid[idx - 7]) return
  // Prevents turn switch when column is full and Row 1 is clicked on
  if (grid[idx + 35] && grid[idx]) return
  turn *= -1
}

function changeResetBtnStyle(evt) {
  evt.target.style.filter = 'brightness(75%)'
  resetBtn.addEventListener('mouseup', () => {
    evt.target.style.filter = ''
  })
  resetBtn.addEventListener('mouseout', () => {
    evt.target.style.filter = ''
  })
  resetBtn.addEventListener('mouseover', () => {
    evt.target.style.filter = 'brightness(75%)'
  })
}

function controlMusic() {
  if (musicBtn.textContent === 'Music: OFF') {
    musicBtn.textContent = 'Music: ON'
  } else {
    musicBtn.textContent = 'Music: OFF'
  }
  allAudio.playBGM()
  musicBtn.addEventListener('click', ()=> {
    allAudio.muteBGM()
  })
}

function sfxStatus() {
  if (!sfxMuted) {
    sfxMuted = true
  } else {
    sfxMuted = false
  }
  if (sfxBtn.textContent === 'SFX: ON') {
    sfxBtn.textContent = 'SFX: OFF'
  } else {
    sfxBtn.textContent = 'SFX: ON'
  }
}