import { Player } from "../modules/player";

describe("Player Testings", () => {
  let player;

  beforeEach(() => {
    player = new Player("PLAYER 1");
  });

  it("random moves from 1 to 100", () => {
    expect(player.guessRandomMove()).toBeLessThanOrEqual(100);
  });
});
