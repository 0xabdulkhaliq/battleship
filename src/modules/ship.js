// Carrier - 5,
// Battleship - 4,
// Destroyer - 3,
// Submarine - 3,
// Patrol Boat - 2

class Ship {
  constructor(name, position) {
    this.name = name
    this.position = position
    this.hits = []
  }

  hit(index) {
    this.hits.push(index)
  }

  isSunk() {
    return this.position.every((occupiedCell) => this.hits.includes(occupiedCell))
  }
}

export { Ship }
