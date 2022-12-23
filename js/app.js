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
const player1Score = document.querySelector('#p1Score')
const player2Score = document.querySelector('#p2Score')
const musicBtn = document.querySelector('#music-button')
const sfxBtn = document.querySelector('#sfx-button')
const rowEls = document.querySelectorAll('.row')
const columnEls = document.querySelectorAll('.column')
// Variables ---------------------------------------------------------------
let winner
let tie 
let turn
let grid
let p1Score = 0
let p2Score = 0
let clickDisable = false
let sfxMuted = false
let comlumnFull = false
let gameOver = false
// Event Listeners ---------------------------------------------------------
gridEls.forEach(gridEl => gridEl.addEventListener('click', handleClick))
resetBtn.addEventListener('click', clearGrid)
resetBtn.addEventListener('mousedown', changeResetBtnStyle)
musicBtn.addEventListener('click', controlMusic)
sfxBtn.addEventListener('click', controlSFX)
gridEls.forEach(gridEl => gridEl.addEventListener('mouseover', handleMouseOver))
gridEls.forEach(gridEl => gridEl.addEventListener('mouseout', handleMouseOut))
// Functions ---------------------------------------------------------------

init()

function init() {
  winner = false
  tie = false
  gameOver = false
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
    gridEls.forEach(gridEl => {
      gridEl.classList.remove(
        'fall-1',
        'fall-2',
        'fall-3',
        'fall-4',
        'fall-5',
        'fall-6',
        'reset-1',
        'reset-2',
        'reset-3',
        'reset-4',
        'reset-5',
        'reset-6'
        )
    })
  }
}

function clearGrid() {
  if (winner || tie) {
    clearRow1()
    clearRow2()
    clearRow3()
    clearRow4()
    clearRow5()
    clearRow6()
    if (!sfxMuted) {
      allAudio.playReset()
    } else {
      allAudio.muteReset()
    }
    setTimeout(updateGridClass, 900)
    setTimeout(init, 900)
  }
}

function clearRow1() {
  gridEls[0].classList.add('reset-1')
  gridEls[1].classList.add('reset-1')
  gridEls[2].classList.add('reset-1')
  gridEls[3].classList.add('reset-1')
  gridEls[4].classList.add('reset-1')
  gridEls[5].classList.add('reset-1')
  gridEls[6].classList.add('reset-1')
}

function clearRow2() {
  gridEls[7].classList.add('reset-2')
  gridEls[8].classList.add('reset-2')
  gridEls[9].classList.add('reset-2')
  gridEls[10].classList.add('reset-2')
  gridEls[11].classList.add('reset-2')
  gridEls[12].classList.add('reset-2')
  gridEls[13].classList.add('reset-2')
}

function clearRow3() {
  gridEls[14].classList.add('reset-3')
  gridEls[15].classList.add('reset-3')
  gridEls[16].classList.add('reset-3')
  gridEls[17].classList.add('reset-3')
  gridEls[18].classList.add('reset-3')
  gridEls[19].classList.add('reset-3')
  gridEls[20].classList.add('reset-3')
}

function clearRow4() {
  gridEls[21].classList.add('reset-4')
  gridEls[22].classList.add('reset-4')
  gridEls[23].classList.add('reset-4')
  gridEls[24].classList.add('reset-4')
  gridEls[25].classList.add('reset-4')
  gridEls[26].classList.add('reset-4')
  gridEls[27].classList.add('reset-4')
}

function clearRow5() {
  gridEls[28].classList.add('reset-5')
  gridEls[29].classList.add('reset-5')
  gridEls[30].classList.add('reset-5')
  gridEls[31].classList.add('reset-5')
  gridEls[32].classList.add('reset-5')
  gridEls[33].classList.add('reset-5')
  gridEls[34].classList.add('reset-5')
}

function clearRow6() {
  gridEls[35].classList.add('reset-6')
  gridEls[36].classList.add('reset-6')
  gridEls[37].classList.add('reset-6')
  gridEls[38].classList.add('reset-6')
  gridEls[39].classList.add('reset-6')
  gridEls[40].classList.add('reset-6')
  gridEls[41].classList.add('reset-6')
}

function handleClick(evt) {
  if (!clickDisable) {
    comlumnFull = false
    const grIdx = parseInt(evt.target.id.replace('gr', ''))
    checkColumnFull(grIdx)
    if (winner || tie || comlumnFull) return
    setTimeout(clickEnable, 600)
    placePiece(grIdx)
    animatePiece(grIdx)
    if (!sfxMuted) {
      allAudio.playClick()
    } else {
      allAudio.muteClick()
    }
    if (gameOver) return
    checkForTie()
    checkForWinner()
    switchPlayerTurn(grIdx)
    render()
    clickDisable = true
  }
}

function clickEnable() {
  clickDisable = false
}

function checkColumnFull(idx) {
  if (grid[idx] && grid[idx - 35]) {
    return comlumnFull = true
  } else if (grid[idx + 7] && grid[idx - 28]) {
    return comlumnFull = true
  } else if (grid[idx + 14] && grid[idx - 21]) {
    return comlumnFull = true
  } else if (grid[idx + 21] && grid[idx - 14]) {
    return comlumnFull = true
  } else if (grid[idx + 28] && grid[idx - 7]) {
    return comlumnFull = true
  } else if (grid[idx + 35] && grid[idx]) {
    return comlumnFull = true
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

function checkForTie() {
  if (grid.some(val => !val)) {
    return
  } else {
    setTimeout(declareTie, 200)
  }
}

function declareTie() {
  tie = true
  render()
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    if (Math.abs(grid[combo[0]] + grid[combo[1]] + grid[combo[2]] + grid[combo[3]]) === 4) {
      setTimeout(declareWinner, 200)
    }
  })
}

function declareWinner() {
  winner = true
  render()
}

function switchPlayerTurn() {
  if (winner) return
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

function controlSFX() {
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

function handleMouseOver(evt) {
  const grIdx = parseInt(evt.target.id.replace('gr', ''))
  if (winner || tie) return
  if (grIdx <= 6) mouseOverRow1()
  if (grIdx >= 7 && grIdx <= 13) mouseOverRow2()
  if (grIdx >= 14 && grIdx <= 20) mouseOverRow3()
  if (grIdx >= 21 && grIdx <= 27) mouseOverRow4()
  if (grIdx >= 28 && grIdx <= 34) mouseOverRow5()
  if (grIdx >= 35) mouseOverRow6()
  if (grIdx === 0 || !(grIdx % 7)) mouseOverColumn1()
  if (!(grIdx - 1) || !((grIdx - 1) % 7)) mouseOverColumn2()
  if (!(grIdx - 2) || !((grIdx - 2) % 7)) mouseOverColumn3()
  if (!(grIdx - 3) || !((grIdx - 3) % 7)) mouseOverColumn4()
  if (!(grIdx - 4) || !((grIdx - 4) % 7)) mouseOverColumn5()
  if (!(grIdx - 5) || !((grIdx - 5) % 7)) mouseOverColumn6()
  if (!(grIdx - 6) || !((grIdx - 6) % 7)) mouseOverColumn7()
  if (!sfxMuted) {
    if (turn === 1) {
      allAudio.playHover()
    } else {
      allAudio.playHover2()
    }
  } else {
    allAudio.muteHover()
    allAudio.muteHover2()
  }
}

function mouseOverRow1() {
  if (turn === 1) {
    rowEls[0].classList.add('row-1-p1')
  } else {
    rowEls[0].classList.add('row-1-p2')
  }
}

function mouseOverRow2() {
  if (turn === 1) {
    rowEls[1].classList.add('row-2-p1')
  } else {
    rowEls[1].classList.add('row-2-p2')
  }
}

function mouseOverRow3() {
  if (turn === 1) {
    rowEls[2].classList.add('row-3-p1')
  } else {
    rowEls[2].classList.add('row-3-p2')
  }
}

function mouseOverRow4() {
  if (turn === 1) {
    rowEls[3].classList.add('row-4-p1')
  } else {
    rowEls[3].classList.add('row-4-p2')
  }
}

function mouseOverRow5() {
  if (turn === 1) {
    rowEls[4].classList.add('row-5-p1')
  } else {
    rowEls[4].classList.add('row-5-p2')
  }
}

function mouseOverRow6() {
  if (turn === 1) {
    rowEls[5].classList.add('row-6-p1')
  } else {
    rowEls[5].classList.add('row-6-p2')
  }
}

function mouseOverColumn1() {
  if (turn === 1) {
    columnEls[0].classList.add('column-1-p1')
  } else {
    columnEls[0].classList.add('column-1-p2')
  }
}

function mouseOverColumn2() {
  if (turn === 1) {
    columnEls[1].classList.add('column-2-p1')
  } else {
    columnEls[1].classList.add('column-2-p2')
  }
}

function mouseOverColumn3() {
  if (turn === 1) {
    columnEls[2].classList.add('column-3-p1')
  } else {
    columnEls[2].classList.add('column-3-p2')
  }
}

function mouseOverColumn4() {
  if (turn === 1) {
    columnEls[3].classList.add('column-4-p1')
  } else {
    columnEls[3].classList.add('column-4-p2')
  }
}

function mouseOverColumn5() {
  if (turn === 1) {
    columnEls[4].classList.add('column-5-p1')
  } else {
    columnEls[4].classList.add('column-5-p2')
  }
}

function mouseOverColumn6() {
  if (turn === 1) {
    columnEls[5].classList.add('column-6-p1')
  } else {
    columnEls[5].classList.add('column-6-p2')
  }
}

function mouseOverColumn7() {
  if (turn === 1) {
    columnEls[6].classList.add('column-7-p1')
  } else {
    columnEls[6].classList.add('column-7-p2')
  }
}

function handleMouseOut(evt) {
  const grIdx = parseInt(evt.target.id.replace('gr', ''))
  if (grIdx <= 6) mouseOutRow1()
  if (grIdx >= 7 && grIdx <= 13) mouseOutRow2()
  if (grIdx >= 14 && grIdx <= 20) mouseOutRow3()
  if (grIdx >= 21 && grIdx <= 27) mouseOutRow4()
  if (grIdx >= 28 && grIdx <= 34) mouseOutRow5()
  if (grIdx >= 35) mouseOutRow6()
  if (!grIdx || !(grIdx % 7)) mouseOutColumn1()
  if (!(grIdx - 1) || !((grIdx - 1) % 7)) mouseOutColumn2()
  if (!(grIdx - 2) || !((grIdx - 2) % 7)) mouseOutColumn3()
  if (!(grIdx - 3) || !((grIdx - 3) % 7)) mouseOutColumn4()
  if (!(grIdx - 4) || !((grIdx - 4) % 7)) mouseOutColumn5()
  if (!(grIdx - 5) || !((grIdx - 5) % 7)) mouseOutColumn6()
  if (!(grIdx - 6) || !((grIdx - 6) % 7)) mouseOutColumn7()
}

function mouseOutRow1() {
  rowEls[0].classList.remove('row-1-p1')
  rowEls[0].classList.remove('row-1-p2')
}

function mouseOutRow2() {
  rowEls[1].classList.remove('row-2-p1')
  rowEls[1].classList.remove('row-2-p2')
}

function mouseOutRow3() {
  rowEls[2].classList.remove('row-3-p1')
  rowEls[2].classList.remove('row-3-p2')
}

function mouseOutRow4() {
  rowEls[3].classList.remove('row-4-p1')
  rowEls[3].classList.remove('row-4-p2')
}

function mouseOutRow5() {
  rowEls[4].classList.remove('row-5-p1')
  rowEls[4].classList.remove('row-5-p2')
}

function mouseOutRow6() {
  rowEls[5].classList.remove('row-6-p1')
  rowEls[5].classList.remove('row-6-p2')
}

function mouseOutColumn1() {
  columnEls[0].classList.remove('column-1-p1')
  columnEls[0].classList.remove('column-1-p2')
}

function mouseOutColumn2() {
  columnEls[1].classList.remove('column-2-p1')
  columnEls[1].classList.remove('column-2-p2')
}

function mouseOutColumn3() {
  columnEls[2].classList.remove('column-3-p1')
  columnEls[2].classList.remove('column-3-p2')
}

function mouseOutColumn4() {
  columnEls[3].classList.remove('column-4-p1')
  columnEls[3].classList.remove('column-4-p2')
}

function mouseOutColumn5() {
  columnEls[4].classList.remove('column-5-p1')
  columnEls[4].classList.remove('column-5-p2')
}

function mouseOutColumn6() {
  columnEls[5].classList.remove('column-6-p1')
  columnEls[5].classList.remove('column-6-p2')
}

function mouseOutColumn7() {
  columnEls[6].classList.remove('column-7-p1')
  columnEls[6].classList.remove('column-7-p2')
}