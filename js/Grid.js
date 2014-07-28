function Grid(rowSize, columnSize){
	this.rowSize = rowSize || 8;
	this.columnSize = columnSize || 8;
	this.grid = this.createEmptyGrid();
}

Grid.prototype.createEmptyGrid = function() {
	var gridSize = this.rowSize*this.columnSize,
		grid = {};

	for(var i=1; i <= gridSize; i++){
		grid[i] = '-';
	}

	return grid;
};

Grid.prototype.tileValue = function(tileLocation, value){
	if(value === undefined){
		return this.grid[tileLocation];
	}

	this.grid[tileLocation] = value;
	return value;
};

Grid.prototype.print = function() {
	var gridSize = this.rowSize*this.columnSize,
		gridString = "";

	for(var i=1; i<=gridSize; i++){
		gridString += this.grid[i] + " ";
		gridString += i%this.rowSize === 0 ? "\n" : "";
	}

	console.log(gridString);
};

Grid.prototype.nearestNeighbors = function(tileLocation){
	var neighborLocations = {};
	tileLocation = parseInt(tileLocation, 10);

	if(tileLocation%this.rowSize !== 1){
		neighborLocations[7] = tileLocation-1;

		if(this.grid[tileLocation+this.rowSize-1] !== undefined) {
			neighborLocations[6] = tileLocation+this.rowSize-1;
		}

		if(this.grid[tileLocation-this.rowSize-1] !== undefined) {
			neighborLocations[8] = tileLocation-this.rowSize-1;
		}
	}

	if(tileLocation%this.rowSize !== 0){
		neighborLocations[3] = tileLocation+1;

		if(this.grid[tileLocation+this.rowSize+1] !== undefined) {
			neighborLocations[4] = tileLocation+this.rowSize+1;
		}

		if(this.grid[tileLocation-this.rowSize+1] !== undefined) {
			neighborLocations[2] = tileLocation-this.rowSize+1;
		}
	}

	if(this.grid[tileLocation-this.rowSize] !== undefined){
		neighborLocations[1] = tileLocation-this.rowSize;
	}

	if(this.grid[tileLocation+this.rowSize] !== undefined){
		neighborLocations[5] = tileLocation+this.rowSize;
	}

	return neighborLocations;
};