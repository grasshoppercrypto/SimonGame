
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();
var started = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level-1);
//    console.log(userClickedPattern);
});

$(document).keypress(function(){
    if (!started){
        
        //$("h1").text("Level " + level);
        setTimeout(function() {
            //your code to be executed after 1 second
            nextSequence();
          }, 500);
    
        started = true;
    } 
});


function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        //your code to be executed after 1 second
        $("#"+currentColour).removeClass("pressed");
      }, 100);

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function() {
                //your code to be executed after 1 second
                nextSequence();
              }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            //your code to be executed after 1 second
            $("body").removeClass("game-over");
          }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
 
        startOver();;
          
        

    }
}

function startOver() {
    level = 0;
    gamePattern = new Array();
    userClickedPattern = new Array();
    started = false;

}