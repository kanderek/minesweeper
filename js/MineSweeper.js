function MineSweeper(rowSize, columnSize, numberOfMines) {
	this.rowSize = rowSize || 8;
	this.columnSize = columnSize || 8;
	this.numberOfMines = numberOfMines || 10;
	this.mineLocations = {};
	this.mineField = {};
	this.domElement = undefined;
	this.MINE = "!";
}

MineSweeper.prototype.newMineField = function() {
	this.createEmptyMineField();
	this.placeMines();
	this.placeNumbers();
};

MineSweeper.prototype.createEmptyMineField = function() {
	var gridSize = this.rowSize*this.columnSize;

	for(var i=1; i <= gridSize; i++){
		this.mineField[i] = 0;
	}
};

MineSweeper.prototype.placeMines = function() {
	var minesLeft = this.numberOfMines,
		gridSize = this.rowSize*this.columnSize,
		testLocation,
		mineLocations = [];

	while(minesLeft > 0) {

		testLocation = Math.ceil(Math.random()*gridSize);
		if (!(testLocation in mineLocations)) {
			this.mineField[testLocation] = this.MINE;
			mineLocations.push(testLocation);
			minesLeft -= 1;
		}
	}

	return mineLocations;
};

MineSweeper.prototype.placeNumbers = function() {
	var gridSize = this.rowSize*this.columnSize,
		numberAdjacentMines = 0;

	for(var i=1; i <= gridSize; i++){
		numberAdjacentMines = 0;
		if(this.mineField[i] !== this.MINE){
			//look around and count mines

			//Left
			if(i%this.rowSize !== 1){
				numberAdjacentMines += this.mineField[i-1] === this.MINE ? 1 : 0;
				numberAdjacentMines += this.mineField[i+this.rowSize-1] === this.MINE ? 1 : 0;
				numberAdjacentMines += this.mineField[i-this.rowSize-1] === this.MINE ? 1 : 0;
			}

			//Right
			if(i%this.rowSize !== 0){
				numberAdjacentMines += this.mineField[i+1] === this.MINE ? 1 : 0;
				numberAdjacentMines += this.mineField[i+this.rowSize+1] === this.MINE ? 1 : 0;
				numberAdjacentMines += this.mineField[i-this.rowSize+1] === this.MINE ? 1 : 0;
			}

			//Top
			numberAdjacentMines += this.mineField[i-this.rowSize] === this.MINE ? 1 : 0;
	
			//Bottom
			numberAdjacentMines += this.mineField[i+this.rowSize] === this.MINE ? 1 : 0;
			
			this.mineField[i] = numberAdjacentMines;
		}
	}
};


MineSweeper.prototype.printMineField = function() {
	var gridSize = this.rowSize*this.columnSize,
		mineFieldString = "";

	for(var i=1; i<=gridSize; i++){
		mineFieldString += this.mineField[i] + " ";
		mineFieldString += i%this.rowSize === 0 ? "\n" : "";
	}

	console.log(mineFieldString);
};


