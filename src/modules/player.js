import Gameboard from './gameboard'

class Player extends Gameboard {
  constructor(domBoard) {
    super(domBoard)
  }

  makeRandomMove() {
    let randomMove

    do {
      randomMove = this.guessRandomMove
    } while (!this.isAttackReceivable(randomMove))
    this.receiveAttack(randomMove)
  }

  get guessRandomMove() {
    return Math.floor(Math.random() * 99) + 1
  }
}

export default Player
