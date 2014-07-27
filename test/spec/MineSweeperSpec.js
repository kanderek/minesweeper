describe("MineSweeper", function() {
  var minesweeper;

  beforeEach(function() {
    minesweeper = new MineSweeper(8,8,10);
  });

  describe("createEmptyMineField", function() {

    it("should have property 64 and value should be 0", function() {
      minesweeper.createEmptyMineField();
      expect(minesweeper.mineField.hasOwnProperty(64)).toBe(true);
      expect(minesweeper.mineField[64]).toBe(0);
    });
  
  });

  describe("placeMines", function() {

    it("should return an array of locations with the same length as number of mines", function() {
      var numberOfMineLocations = minesweeper.placeMines().length;
      expect(numberOfMineLocations).toEqual(minesweeper.numberOfMines);
    });
  
  });

});
