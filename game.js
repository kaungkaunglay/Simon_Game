//inital arrays
var gamePattern = []; 
var userClickedPattern = []; 
//initial variable
var level = 0;  
var started = false; 
function nextSequence(){
	level++;
	$('#level-title').html("Level "+level); 
	var random_num = Math.floor(Math.random() * 3);
	var buttonColours = ["red","blue","green","yellow"];
	var randomChosenColour = buttonColours[random_num];
	gamePattern.push(randomChosenColour);

	//select according with id
	$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour); 
	console.log(gamePattern);
	console.log(userClickedPattern);
}
function StartOver(){
	level = 0 ;
	gamePattern = [];
	userClickedPattern = []; 
	started = false; 
}
function checkAnswer(currentLevel){
	// when the sequence is called
	var validator = true; 
	if(currentLevel ==  gamePattern.length){
		for(var i =0; i<gamePattern.length; i++){
			if(gamePattern[i] != userClickedPattern[i]){
				validator = false;
			}
		}
		if(validator){
			setTimeout(nextSequence,1000);
			userClickedPattern =[]; //user pattern is rest
		}else{
			playSound("wrong");
			$("body").addClass("game-over");
			setTimeout(function(){
				$("body").removeClass("game-over");
			},200);
			$("h1").html("Game over, Press Any Key to Restart");
			StartOver();
		}
	}
}
function playSound(name){
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play(); 
}
function AnimatPress(currentColour){
	var get_button = document.querySelector("#"+currentColour); 
	get_button.classList.add("pressed");
}
function RemoveAnimatePress(currentColour){
	var get_button = document.querySelector("#"+currentColour);
	get_button.classList.remove("pressed");
}
//user interaction
$(".btn").on("click", function(){
	var userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	AnimatPress(userChosenColour);
	setTimeout(function(){
		RemoveAnimatePress(userChosenColour);
	},100);
	checkAnswer(userClickedPattern.length);
});
$(document).on("keypress",function(){
	if(!started){
		nextSequence();
		started = true;
	}
}); 