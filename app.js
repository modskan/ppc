var INTERVAL = 1000;
var DEFAULT_MESSAGE = "I—¹";
var DEFAULT_MESSAGE2 = "—\—éuƒ`[[[ƒ“v";
var DEFAULT_MESSAGE3 = "Ž¿‹^‰ž“š‚¨‚í‚è[";

var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "‚ ‚Æ" + alarm.duration + "•b";
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){
				message = alarm.message;
		}
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

var showBellMessage = function(){
		var message = DEFAULT_MESSAGE2;
		alarm.output2.textContent = message;
};

var showEndQuestionMessage = function(){
		var message = DEFAULT_MESSAGE3;
		alarm.output3.textContent = message;
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown() && isReadyToBell()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
		else if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
				showBellMessage();
		}

		else{showAlarmMessage();
			 startAlarm2();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};


var isReadyToBell = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 3;
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var startAlarm2 = function(){
				window.setTimeout(showEndQuestionMessage, 5000);
};


var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");
		alarm.output2 = document.querySelector("#countdown2");
		alarm.output3 = document.querySelector("#countdown3");
		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
};

initApp();
