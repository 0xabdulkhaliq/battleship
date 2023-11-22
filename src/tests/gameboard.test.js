import Gameboard from "../modules/gameboard";

describe("Gameboard testings", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it("Gameboard length needs to be 100", () => {
    expect(gameboard.board.length).toBe(100);
  });

  it("Place ship on Gameboard", () => {
    gameboard.placeShip("carrier", [0, 1, 2, 3, 4]);
    expect(Object.keys(gameboard.ships)).toContain("carrier");
  });

  it("Placing more ships on Gameboard", () => {
    gameboard.placeShip("carrier", [0, 1, 2, 3, 4]);
    gameboard.placeShip("patrol boat", [10, 11, 12]);

    expect(Object.keys(gameboard.ships).length).toBe(2);
  });

  it("prevent placement of one ship on top of another ship", () => {
    gameboard.placeShip("carrier", [1, 2, 3, 4, 5]);

    expect(gameboard.placeShip("battleship", [4, 5, 6, 7])).toBe("ship exists");
  });

  it("verifying missing hit", () => {
    gameboard.placeShip("carrier", [0, 1, 2, 3, 4]);

    expect(gameboard.receiveAttack(5)).toBe("miss");
  });

  it("verifying successful hit", () => {
    gameboard.placeShip("carrier", [0, 1, 2, 3, 4]);

    expect(gameboard.receiveAttack(0)).toBe("hit");
  });

  it("collecting single sunked ship name", () => {
    gameboard.placeShip("carrier", [0, 1, 2, 3, 4]);

    gameboard.receiveAttack(0);
    gameboard.receiveAttack(1);
    gameboard.receiveAttack(2);
    gameboard.receiveAttack(3);
    gameboard.receiveAttack(4);

    expect(gameboard.sunkedShips).toContain("carrier");
  });

  it("collecting multiple sunked ships names", () => {
    gameboard.placeShip("submarine", [10, 11, 12]);
    gameboard.placeShip("patrol boat", [66, 67]);

    gameboard.receiveAttack(10);
    gameboard.receiveAttack(11);
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(66);
    gameboard.receiveAttack(67);

    expect(gameboard.sunkedShips.length).toBe(2);
  });

  it("every ship has been sunked", () => {
    gameboard.placeShip("carrier", [1, 2, 3, 4, 5]);
    gameboard.placeShip("battleship", [7, 8, 9, 10]);
    gameboard.placeShip("destroyer", [81, 82, 83]);
    gameboard.placeShip("submarine", [11, 12, 13]);
    gameboard.placeShip("patrol boat", [66, 67]);

    const shipCoords = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 66, 67, 81, 82, 83];

    shipCoords.forEach((coord) => gameboard.receiveAttack(coord));

    expect(gameboard.hasEveryShipSunked).toBe(true);
  });

  it("preventing multiple attacks on same coords", () => {
    gameboard.placeShip("carrier", [1, 2, 3, 4, 5]);
    gameboard.receiveAttack(5);
    gameboard.receiveAttack(6);

    expect(gameboard.isAttackReceivable(6)).toBe(false);
  });
});

// Carrier - 5,
// Battleship - 4,
// Destroyer - 3,
// Submarine - 3,
// Patrol Boat - 2
