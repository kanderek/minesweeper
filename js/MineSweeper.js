function MineSweeper(rowSize, columnSize, numberOfMines, elementId) {

	this.mineLocations = {};
	this.mineField = new MineField(rowSize, columnSize, numberOfMines);
	this.playerMineMap = new Grid(rowSize, columnSize);
	this.domElement = document.getElementById(elementId);
	this.FLAG = "!";

    this.clearDomMineField();
	this.buildDomMineField();
}

MineSweeper.prototype.markPlayersMineMap = function(tileLocation, typeOfMark) {

	var fieldValue = this.mineField.field.tileValue(tileLocation);
    var losingMark = false;

	if(fieldValue === this.mineField.MINE && typeOfMark !== this.FLAG){
		//player loses
		console.log("You lose");
        losingMark = true;
	}
	else{
		if(fieldValue !== 0){
			this.playerMineMap.tileValue(tileLocation, fieldValue);
		}
		else{
			this.connectedSafeTiles(tileLocation);
		}
	}
    return losingMark;
};

MineSweeper.prototype.connectedSafeTiles = function(tileLocation){
	var zeroLocations = [];
	var visited = {};
	var neighbors;
	var neighborIndex;
	var currentLocation;

	if(this.mineField.field.tileValue(tileLocation) === 0){
		zeroLocations.push(tileLocation);

		while(zeroLocations.length > 0){
			currentLocation = zeroLocations.pop();
			neighbors = this.playerMineMap.nearestNeighbors(currentLocation);
			visited[currentLocation] = true;

			for(var neighbor in neighbors){
				neighborIndex = neighbors[neighbor];
				fieldValue = this.mineField.field.tileValue(neighborIndex);
				this.playerMineMap.tileValue(neighborIndex, fieldValue);
				if(fieldValue === 0 && !(neighborIndex in visited)){
					zeroLocations.push(neighborIndex);
				}
			}
		}
	}
};

MineSweeper.prototype.isFieldClear = function() {
	var gridSize = this.playerMineMap.rowSize*this.playerMineMap.columnSize;
	var fieldValue;
	for(var i=0; i<gridSize; i++){
		fieldValue = this.mineField.field.tileValue(i+1);
		if(fieldValue !== this.mineField.MINE){
			if(this.playerMineMap.tileValue(i+1) !== fieldValue){
				return false;
			}
		}
	}
	return true;
};

MineSweeper.prototype.endGame = function() {
	//let player know they won or lost
};

MineSweeper.prototype.syncDom = function() {
	var tiles = this.domElement.getElementsByTagName("input");
	var gridSize = this.playerMineMap.rowSize*this.playerMineMap.columnSize;
	var mapValue;

    for(var i=0; i<gridSize; i++){
        mapValue = this.playerMineMap.tileValue(i+1);
		if(mapValue !== "-"){
			tiles[i].checked = true;
            tiles[i].nextSibling.innerHTML = mapValue !== 0 ? mapValue : "";
		}
	}
};

MineSweeper.prototype.buildDomMineField = function() {
	var root = this.domElement,
		grid = document.createDocumentFragment(),
		id = "",
		rowSize = this.mineField.field.rowSize,
		columnSize = this.mineField.field.columnSize,
		row, cell;

	var body = grid.appendChild(document.createElement("tbody"));

	for(var i=1; i<=columnSize; i++){
		var tr = document.createElement("tr");

		row = body.appendChild(tr);

		for(var j=1; j<=rowSize; j++){
			var td = document.createElement("td"),
				input = document.createElement("input"),
				label = document.createElement("label");

			id = "tile-"+((i-1)*rowSize + j);
			cell = row.appendChild(td);
			input.setAttribute("id", id);
			input.setAttribute("type", "radio");
			cell.appendChild(input);
			label.setAttribute("for", id);
			//label.innerHTML =  this.mineField.field.tileValue((i-1)*rowSize + j);////((i-1)*rowSize + j);
            
			cell.appendChild(label);
		}
	}
	root.appendChild(grid);
};

MineSweeper.prototype.clearDomMineField = function(){
	var myNode = this.domElement;
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
};



