
//game 
let gamePattern = new Array();
let userPattern = new Array();
let level = 0;
let started = false;
const btnColors = ['red', 'blue', 'green', 'yellow']


//create patterns
function nextSequence() {
    userPattern = []; //re-intializes the user arra
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = btnColors[randomNumber];
    gamePattern.push(randomChosenColour);
    btnAnimation(randomChosenColour)
    playSound(randomChosenColour);
    console.log(gamePattern);
}


//create sound
const playSound = src => {
    let audio = new Audio(`sounds/${src}.mp3`);
    audio.play();
};


const playUsingKeys = (btnColor => {
    playSound(btnColor);
    btnAnimation(btnColor);
    userPattern.push(btnColor);
    checkUserInput(userPattern.length - 1);
});

//start game
//clicking the enter icon
$('#entr-btn').click(() => {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
    console.log('clicked');
});
//clinking enter from keyboard
$(document).keypress((e) => {

    if (e.key === 'Enter') {
        if (!started) {
            $("#level-title").text(`Level ${level}`);
            nextSequence();
            started = true;
        }
    }

    //play game using keys
    let btn = e.key;
    switch (btn.toLowerCase()) {

        case 'w': playUsingKeys('green'); break;
        case 'a': playUsingKeys('red'); break;
        case 's': playUsingKeys('yellow'); break;
        case 'd': playUsingKeys('blue'); break;

    }
});

//CLICK > don't use arrow func when dealing with 'this' keyword;
//play game by clicking
$('.btn').click(function () {
    let btnSrc = $(this).attr('id'); //return id of the clicked btn
    userPattern.push(btnSrc);

    playSound(btnSrc);
    btnAnimation(btnSrc);

    checkUserInput(userPattern.length - 1);
});


//Check user input
const checkUserInput = (currentLevel) => {
    //the array length will linearly increment wrt the level
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            //generating nextsequence/pattern
            setTimeout(() => {
                nextSequence();
            }, 1200);

            setTimeout(() => { $('body').addClass('success'); }, 500);
            setTimeout(() => { $("body").removeClass("success"); }, 700);
        }
    }
    else {
        playSound('wrong');

        $('body').addClass('game-over');
        $("#level-title").html("Game Over, Press <span id='entr-btn'>Enter</span> Key to Restart");
        //clicking the enter icon
        $('#entr-btn').click(() => {
            if (!started) {
                $("#level-title").text(`Level ${level}`);
                nextSequence();
                started = true;
            }
            console.log('clicked');
        });

        //removing class from body after 200ms
        setTimeout(() => { $("body").removeClass("game-over"); }, 500);

        //re-initializing everthing 
        startOver();
    }

}


//btn animation
const btnAnimation = e => {
    $(`#${e}`).animate({ padding: 10 }).animate({ padding: 0 }, { duration: 50 });
    $(`#${e}`).addClass('pressed');

    setTimeout(() => {
        $(`#${e}`).removeClass('pressed');
    }, 200);
}

//restart game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



