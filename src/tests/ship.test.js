import { Ship } from '../modules/ship';

describe('Ship functions', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship('carrier', [0, 1, 2, 3, 4]);
  });

  it('Ship will not be sunked for one Hit', () => {
    ship.hit(0);

    expect(ship.isSunk()).toBe(false);
  });

  it('Ship accepts multiple Hits', () => {
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.hits).toEqual([1, 2, 3]);
  });

  it('Ship needs to be Sunked when it got right Hits', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(7);
    ship.hit(3);
    ship.hit(6);
    ship.hit(9);
    ship.hit(4);
    ship.hit(2);

    expect(ship.isSunk()).toBe(true);
  });

  it('Ship needs to be Sunked when it got right Hits', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    ship.hit(4);

    expect(ship.isSunk()).toBe(true);
  });
});
