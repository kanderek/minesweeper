var minesweeper = new MineSweeper(8, 8, 10, "mine-field");
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

function handleChange(event) {
	var target = event.target ? event.target : event.srcElement;
	var flagElement = target.tagName.toLowerCase() === "label" ? target : target.nextSibling;
	var id = target.id ? target.id : target.previousSibling.id;

	showAnxiety();
	if(id){
		var index = id.slice(5);
		var locationValue = minesweeper.mineField.field.tileValue(index);

		if(!event.shiftKey){
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
		else {
			event.preventDefault();
			if(flagElement.classList.contains("flag")){
				flagElement.classList.remove("flag");
				flagElement.previousSibling.disabled = false;
				flagCount = flagCount > 0 ? flagCount - 1 : 0;
				difficultyDom.getElementsByTagName("span")[1].innerHTML = mineCount - flagCount;
			}
			else {
				flagElement.classList.add("flag");
				flagElement.previousSibling.disabled = true;
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

    faceDom.classList.remove("dead-face")
    faceDom.classList.add("happy-face");
	spans[0].innerHTML = difficulty;

	timer.stop();
	timer.reset();
	timer.start();

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