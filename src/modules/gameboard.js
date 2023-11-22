import { Ship } from './ship'

class Gameboard {
  constructor(domBoard) {
    this.domBoard = domBoard
    this.board = this.createBoard()
    this.ships = {}
  }

  createBoard() {
    const board = []

    for (let i = 0; i <= 100; i++) {
      board.push({
        placedShip: undefined,
        shotStatus: undefined,
      })
    }

    return board
  }

  hasShipExistsOnCoords(coords) {
    for (const coord of coords) {
      if (this.board[coord].placedShip !== undefined) return true
    }
    return false
  }

  placeShip(shipName, coords) {
    if (this.hasShipExistsOnCoords(coords)) return true

    coords.forEach((coord) => {
      this.board[coord].placedShip = shipName
    })

    this.ships[shipName] = new Ship(shipName, coords)
  }

  receiveAttack(coords) {
    if (!this.isAttackReceivable(coords)) return

    const ship = this.board[coords].placedShip
    const square = this.domBoard.querySelector(`.square:nth-child(${coords})`)

    if (ship !== undefined) {
      this.ships[ship].hit(coords)
      square.classList.add('hit')
      return (this.board[coords].shotStatus = 'hit')
    }

    square.classList.add('miss')
    return (this.board[coords].shotStatus = 'miss')
  }

  isAttackReceivable(coords) {
    return this.board[coords].shotStatus === undefined
  }

  get sunkedShips() {
    const sunkedShips = []

    Object.keys(this.ships).forEach((ship) => {
      if (this.ships[ship].isSunk()) sunkedShips.push(this.ships[ship].name)
    })

    return sunkedShips
  }

  get hasEveryShipSunked() {
    const shipsFromBoard = Object.keys(this.ships)

    return shipsFromBoard.every((ship) => this.sunkedShips.includes(ship))
  }
}

export default Gameboard
