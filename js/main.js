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
};;
function GameTimer (domDisplayElement, timePassed, isStopped, incrementTimer) {
	this.timePassed = timePassed || 0;
	this.isStopped = isStopped || true;
	this.incrementTimer = incrementTimer || null;
	this.domDisplayElement = document.querySelector(domDisplayElement);
}

GameTimer.prototype.start = function () {

	this.isStopped = false;
	var that = this;
	
	this.incrementTimer = setInterval(function () {
		that.timePassed += 1;
		that.refreshTimeDom();
	}, 1000);
};

GameTimer.prototype.stop = function () {
	this.isStopped = true;
	var that = this;
	clearInterval(that.incrementTimer);
};

GameTimer.prototype.reset = function () {
	this.timePassed = 0;
	this.refreshTimeDom();
};

GameTimer.prototype.toString = function () {
	var seconds = this.timePassed < 60 ? this.timePassed : this.timePassed%60;
	var minutes = (this.timePassed - seconds)/60;

	seconds = seconds < 10 ? "0" + seconds : seconds;

	return minutes + ":" + seconds;
};

GameTimer.prototype.refreshTimeDom = function () {
	try{
		if(this.domDisplayElement){
			this.domDisplayElement.getElementsByTagName("span")[0].innerHTML = this.toString();
		}
		else{
			console.log(this.toString());
		}
	}
	catch(error){
		console.log("there was an error drawing to dom");
	}
};;function MineField(rowSize, columnSize, numberOfMines){
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
};;function MineSweeper(rowSize, columnSize, numberOfMines, elementId) {

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
			this.playerMineMap.tileValue(tileLocation, fieldValue);
			this.connectedSafeTiles(tileLocation);
		}
	}
    return losingMark;
};

MineSweeper.prototype.placePlayerFlag = function() {
    //disable radio button
    //add class to clicked tile
    //
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

MineSweeper.prototype.hint = function() {
    var that = this;
    
    this.addMineClass("show-mines");
    setTimeout(function(){
        that.removeMineClass("show-mines");
    }, 2000);
};

MineSweeper.prototype.addMineClass = function(mineClass) {
    var labels = this.domElement.getElementsByTagName("label");
    var mineLocations = this.mineField.mineLocations;

    for(var location in mineLocations){
        labels[parseInt(location, 10) - 1].classList.add(mineClass);
    }
};

MineSweeper.prototype.removeMineClass = function(mineClass) {
    var labels = this.domElement.getElementsByTagName("label");
    var mineLocations = this.mineField.mineLocations;

    for(var location in mineLocations){
        labels[parseInt(location, 10) - 1].classList.remove(mineClass);
    }
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



;var minesweeper = new MineSweeper(8, 8, 10, "mine-field");
var timer = new GameTimer(".timer");
var difficulty = "easy";
var mineCount = 10;
var flagCount = 0;

var timerDom = document.querySelector(".timer");
var difficultyDom = document.querySelector(".difficulty");
var faceDom = document.querySelector(".face");
var hintDom = document.querySelector(".hint");
var difficultySelectDom = document.getElementById("select-puzzle-options");
var menuGameSettingsDom = document.querySelector(".game-settings");
var menuDropDownDom = document.querySelector(".game-menu-options");
var playAgainModalDom = document.getElementById("play-again-modal");
var gameRulesModalDom = document.getElementById("game-rules-modal");

timer.start();
minesweeper.domElement.addEventListener("click", handleChange, false);

//TODO: refactor
//Gnarly nested ifs 
function handleChange(event) {
	var target = event.target ? event.target : event.srcElement;
	var flagElement = target.tagName.toLowerCase() === "label" ? target : target.nextSibling;
	var id = target.id ? target.id : target.previousSibling.id;
    var targetInput = document.getElementById(id);

	showAnxiety();
	if(id){
		var index = id.slice(5);
		var locationValue = minesweeper.mineField.field.tileValue(index);

		if(!event.shiftKey){
            if(!targetInput.disabled){
    			if(minesweeper.markPlayersMineMap(index)){
    				losingMove();
    			}
    			if(locationValue !== 0){
    				flagElement.innerHTML = locationValue;
    			}
    			minesweeper.syncDom();
    			if(minesweeper.isFieldClear()){
    				winningMove();
    			}
            }
		}
		else {
            console.log("shift key held");
			event.preventDefault();
			if(flagElement.classList.contains("flag")){
				flagElement.classList.remove("flag");
				// flagElement.previousSibling.disabled = false;
                targetInput.disabled = false;
				flagCount = flagCount > 0 ? flagCount - 1 : 0;
				difficultyDom.getElementsByTagName("span")[1].innerHTML = mineCount - flagCount;
			}
			else {
				flagElement.classList.add("flag");
				// flagElement.previousSibling.disabled = true;
                targetInput.disabled = true;
				flagCount = flagCount < mineCount ? flagCount + 1 : mineCount;
				difficultyDom.getElementsByTagName("span")[1].innerHTML = mineCount - flagCount;
			}
		}
	}
}

function losingMove() {
	timer.stop();
	faceDom.classList.add("dead-face");
	minesweeper.addMineClass("show-mines");

	playAgainModalDom.classList.add("show");
	playAgainModalDom.classList.remove("hide");
	playAgainModalDom.getElementsByTagName("h1")[0].innerHTML = "Oh no! Are you Okay?";
}

function winningMove() {
	timer.stop();
	playAgainModalDom.classList.add("show");
	playAgainModalDom.classList.remove("hide");
	playAgainModalDom.getElementsByTagName("h1")[0].innerHTML = "Congrats! The world is a little safer...";
}

function showAnxiety() {
	faceDom.classList.remove("happy-face");
	faceDom.classList.add("worried-face");

	setTimeout(function(){
		faceDom.classList.add("happy-face");
		faceDom.classList.remove("worried-face");
	}, 400);
}

function hideElement(element) {
	element.classList.add("hide");
	element.classList.remove("show");
}

function showElement(element) {
	element.classList.remove("hide");
	element.classList.add("show");
}


faceDom.addEventListener("click", function(event){
	var target = event.target ? event.target : event.srcElement;

	if(!minesweeper.isFieldClear()){
		losingMove();
	}
}, false);

menuGameSettingsDom.addEventListener("click", function(event){
    var target = event.target ? event.target : event.srcElement;

    menuDropDownDom.classList.toggle("show");
    menuDropDownDom.classList.toggle("hide");
    menuGameSettingsDom.classList.toggle("menu-button-active"); 

}, false);

difficultySelectDom.addEventListener("click", function (event) {
    var target = event.target ? event.target : event.srcElement;
    
    menuDropDownDom.classList.remove("show");
    menuDropDownDom.classList.add("hide");
    menuGameSettingsDom.classList.remove("menu-button-active");

    difficulty = target.value;

	newGameByDifficulty(difficulty);

}, false);

function newGameByDifficulty(difficulty) {
	var spans = difficultyDom.getElementsByTagName("span");

    faceDom.classList.remove("dead-face");
    faceDom.classList.add("happy-face");
	spans[0].innerHTML = difficulty;

	timer.stop();
	timer.reset();
	timer.start();

    flagCount = 0;
    switch(difficulty){
        case "easy": 
    		mineCount = 10;
    		minesweeper = new MineSweeper(8, 8, mineCount, "mine-field");
    		spans[1].innerHTML = mineCount;
    		break;
    	case "medium":
    		mineCount = 40;
    		minesweeper = new MineSweeper(16, 16, mineCount, "mine-field");
    		spans[1].innerHTML = mineCount;
    		break;
    	case "hard":
    		mineCount = 99;
    		minesweeper = new MineSweeper(30, 16, mineCount, "mine-field");
    		spans[1].innerHTML = mineCount;
    		break;
    }
}

hintDom.addEventListener("click", function(event){
	minesweeper.hint();
}, false);

playAgainModalDom.addEventListener("click", function(event){
	var target = event.target ? event.target : event.srcElement;

	console.log("modal clicked");
	if(target.tagName.toLowerCase() === "a"){
		event.preventDefault();
		hideElement(playAgainModalDom);
		newGameByDifficulty(difficulty);
	}

}, false);

menuDropDownDom.addEventListener("click", function(event){
    var target = event.target ? event.target : event.srcElement;

    if(target.className === "game-rules"){
        	hideElement(menuDropDownDom);
        	showElement(gameRulesModalDom);
    }

}, false);

gameRulesModalDom.addEventListener("click", function(event){
    var target = event.target ? event.target : event.srcElement;

    hideElement(gameRulesModalDom);

}, false);