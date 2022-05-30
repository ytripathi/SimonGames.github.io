var buttonColors = ["red", "blue", "green", "yellow"]; //3
var gamePattern = []; //5
var userClickedPattern = []; // 11

var started = false; //to keep track whether the game has started or not (19)
var level = 0; // 20

//detect keyboard has been pressed and the game has stareted or not (21)
$(document).keypress(function() {
    if (!started) {
        //should the heading to "Level"+level
        $("#level-title").text("Level " + level);
        nextSequence(); //call nextSequence()
        started = true;
    }
});

//function that will detect which button is clicked (9)
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); //to store the user button color (12)
    userClickedPattern.push(userChosenColor); // 13
    playSound(userChosenColor); //call the function with the user choosen button to play the sound(13)
    animatePresses(userChosenColor); //16
    checkAnswer(userClickedPattern.length - 1); // 24
});

//function to check the pattern with curent level (23)
function checkAnswer(currentLevel) {
    //to check most recent user answer is equal to game pattern (25)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Successful");
        //to check after first if is true, that user have finished their sequence with another if (26)
        if (userClickedPattern.length === gamePattern.length) {
            //call nextSequence() after 1000milisecond delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } //inner if
    } //outter if 
    else {
        //if the pattern match goes wrong apply the wrong effects (28)
        console.log("Wrong");
        playSound("wrong"); //sound effect

        $("body").addClass("game-over"); //background-effect
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        //change heading
        $("#level-title").text("Game Over! Press Any Key to Restart.");

        //restart game (29)
        startOver();
    } //else
}


function nextSequence() {
    //once the nextSeq() is triggered by checkAnswer() set userClickedPattern empty ready for next level (27)
    userClickedPattern = [];

    level++; //21
    $("#level-title").text("Level " + level); //22
    var randomNo = Math.floor(Math.random() * 4); //2
    var randomChosenColor = buttonColors[randomNo]; //4
    gamePattern.push(randomChosenColor); //6

    //select randomChoosenButton and add flash to it (7)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //play audio for the random selected button (8)
    playSound(randomChosenColor);
} //end of nextSequence

//function to play sound  (14)
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to animate when butto pressed (15)
function animatePresses(currentColor) {
    //add the css class of pressed (17)
    $("#" + currentColor).addClass("pressed");

    //remove the effect after 100milisecond (18)
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//function to restart the game (28)
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}