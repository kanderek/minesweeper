
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
};