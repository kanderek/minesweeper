function MineSweeper(rowSize, columnSize, numberOfMines, elementId) {
	this.rowSize = rowSize || 8;
	this.columnSize = columnSize || 8;
	this.numberOfMines = numberOfMines || 10;
	this.mineLocations = {};
	this.mineField = {};
	this.playerMineMap = {};
	this.domElement = document.getElementById(elementId);
	this.MINE = "!";
	this.FLAG = "!";

	this.newMineField();
	this.buildDomMineField();
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

MineSweeper.prototype.markPlayersMineMap = function(tileLocation, typeOfMark) {
	this.playerMineMap[tileLocation] = typeOfMark === this.FLAG ? this.FLAG : this.mineField[tileLocation];
};

MineSweeper.prototype.endGame = function() {
	//let player know they won or lost
};

MineSweeper.prototype.nearestNeighbors = function(grid, tileLocation){
	//Left
	if(tileLocation%this.rowSize !== 1){
		numberAdjacentMines += this.mineField[tileLocation-1] === grid.MINE ? 1 : 0;
		numberAdjacentMines += this.mineField[tileLocation+grid.rowSize-1] === grid.MINE ? 1 : 0;
		numberAdjacentMines += this.mineField[tileLocation-grid.rowSize-1] === grid.MINE ? 1 : 0;
	}

	//Right
	if(i%this.rowSize !== 0){
		numberAdjacentMines += this.mineField[tileLocation+1] === this.MINE ? 1 : 0;
		numberAdjacentMines += this.mineField[tileLocation+this.rowSize+1] === this.MINE ? 1 : 0;
		numberAdjacentMines += this.mineField[tileLocation-this.rowSize+1] === this.MINE ? 1 : 0;
	}

	//Top
	numberAdjacentMines += this.mineField[tileLocation-this.rowSize] === this.MINE ? 1 : 0;

	//Bottom
	numberAdjacentMines += this.mineField[tileLocation+this.rowSize] === this.MINE ? 1 : 0;
			
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


MineSweeper.prototype.buildDomMineField = function() {
	var root = this.domElement,
		grid = document.createDocumentFragment(),
		id ="",
		row, cell;

	var body = grid.appendChild(document.createElement("tbody"));

	for(var i=1; i<=this.columnSize; i++){
		var tr = document.createElement("tr");

		row = body.appendChild(tr);

		for(var j=1; j<=this.rowSize; j++){
			var td = document.createElement("td"),
				input = document.createElement("input"),
				label = document.createElement("label");

			id = "tile-"+((i-1)*this.columnSize + j);
			cell = row.appendChild(td);
			input.setAttribute("id", id);
			input.setAttribute("type", "radio");
			cell.appendChild(input);
			label.setAttribute("for", id);
			label.innerHTML =  ((i-1)*this.columnSize + j);
			cell.appendChild(label);
		}
	}
	root.appendChild(grid);
};



