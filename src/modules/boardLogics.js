import Player from './player'
import { createGameBoards, createHeadings, instantiateNotifier } from './ui'

function gameInitializer() {
  const main = document.querySelector('main')
  createHeadings(main)

  const [playerBoard, computerBoard] = createGameBoards()

  main.append(computerBoard)
  main.append(playerBoard)

  const player = new Player(playerBoard)
  const computer = new Player(computerBoard)

  const [playerShipCoordinates, computerShipCoordinates] = shipPlacingConfiguration()

  for (let i = 0; i < 5; i++) {
    placeShip(player, getShipNames(i), playerShipCoordinates[i])
    placeShip(computer, getShipNames(i), computerShipCoordinates[i], true)
  }

  attackComputer(computer, player, findWinner)
}

function resetGame() {
  const main = document.querySelector('main')
  main.innerHTML = ''

  gameInitializer()
}

function attackComputer(computer, player, findWinner) {
  const computersBoard = document.querySelector('.main__computer-board')

  computersBoard.addEventListener('click', (e) => {
    if (e.target.classList[1] || !e.target.classList.contains('square')) return

    computer.receiveAttack(parseInt(e.target.dataset.coords))
    findWinner(player, computer)

    player.makeRandomMove()
    findWinner(player, computer)
  })
}

function findWinner(player, computer) {
  const result = isAnyoneDefeated(player, computer)

  if (result) {
    instantiateNotifier(textContentForWinner(result))
  }
}

function isAnyoneDefeated(player, computer) {
  if (player.hasEveryShipSunked) return 'Computer'
  if (computer.hasEveryShipSunked) return 'Player'
}

function textContentForWinner(winner) {
  if (winner === 'Computer') {
    winner = getWindowWidth() >= 435 ? 'Computer' : 'Comp'
  }

  return `${winner}<span class="break"></span> Wins!`
}

function getShipNames(index) {
  return ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'][index]
}

function shipPlacingConfiguration() {
  const configuredCoordinates = [
    [
      [2, 12, 22, 32, 42],
      [7, 8, 9, 10],
      [93, 94, 95],
      [47, 57, 67],
      [90, 100],
    ],
    [
      [19, 29, 39, 49, 59],
      [82, 83, 84, 85],
      [32, 42, 52],
      [15, 16, 17],
      [1, 2],
    ],
    [
      [96, 97, 98, 99, 100],
      [10, 20, 30, 40],
      [1, 2, 3],
      [62, 72, 82],
      [33, 34],
    ],
    [
      [47, 57, 67, 77, 87],
      [12, 22, 32, 42],
      [91, 92, 93],
      [8, 9, 10],
      [90, 100],
    ],
    [
      [41, 51, 61, 71, 81],
      [20, 30, 40, 50],
      [25, 26, 26],
      [3, 13, 23],
      [69, 79],
    ],
  ]

  const playerConfig = Math.floor(Math.random() * 5)
  let computerConfig = Math.floor(Math.random() * 5)

  while (computerConfig == playerConfig) {
    computerConfig = Math.floor(Math.random() * 5)
  }

  return [configuredCoordinates[playerConfig], configuredCoordinates[computerConfig]]
}

function placeShip(player, shipName, coords, isComputer) {
  if (player.placeShip(shipName, coords) || isComputer) return

  coords.forEach((coord) => {
    player.domBoard.querySelector(`[data-coords="${coord}"]`).classList.add('ship')
  })
}

export default resetGame
