function MineField(rowSize, columnSize, numberOfMines){
	this.numberOfMines = numberOfMines || 10;
	this.field =  new Grid(rowSize, columnSize);
	this.MINE = "!";

	this.mineLocations = this.placeMines();
	this.placeNumbers();
}

MineField.prototype.placeMines = function() {
	var minesLeft = this.numberOfMines,
		gridSize = this.field.rowSize*this.field.columnSize,
		testLocation,
		mineLocations = {};

	while(minesLeft > 0) {

		testLocation = Math.ceil(Math.random()*gridSize);
		if (!(testLocation in mineLocations)) {
			this.field.tileValue(testLocation, this.MINE);
			mineLocations[testLocation] = true;
			minesLeft -= 1;
		}
	}

	return mineLocations;
};

MineField.prototype.placeNumbers = function() {
	var gridSize = this.field.rowSize*this.field.columnSize,
		nearestNeighbors = {},
		numberAdjacentMines;

	for(var i=1; i <= gridSize; i++){
		numberAdjacentMines = 0;
		if(this.field.tileValue(i) !== this.MINE){
			//look around and count mines
			nearestNeighbors = this.field.nearestNeighbors(i);

			for(var neighbor in nearestNeighbors){
				numberAdjacentMines += this.field.tileValue(nearestNeighbors[neighbor]) === this.MINE ? 1 : 0;
			}
			
			this.field.tileValue(i, numberAdjacentMines);
		}
	}
};