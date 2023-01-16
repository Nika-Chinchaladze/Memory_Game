// DATA SECTION
var myQuestions = null;
var myIcons = null;
function createVariables() {
    myQuestions = ["Snow", "Heart", "Whatsapp", "Instagram", "Umbrella", "Wrench", "Git", "Android", 
    "Apple", "Alarm", "Bluetooth", "Cart", "Database", "Fuel-Pump", "Rocket", "Scissors"];

    myIcons = [
        '<i class="bi bi-snow3"></i>',
        '<i class="bi bi-suit-heart-fill"></i>',
        '<i class="bi bi-whatsapp"></i>',
        '<i class="bi bi-instagram"></i>',
        '<i class="bi bi-umbrella-fill"></i>',
        '<i class="bi bi-wrench"></i>',
        '<i class="bi bi-git"></i>',
        '<i class="bi bi-android2"></i>',
        '<i class="bi bi-apple"></i>',
        '<i class="bi bi-alarm"></i>',
        '<i class="bi bi-bluetooth"></i>',
        '<i class="bi bi-cart-x-fill"></i>',
        '<i class="bi bi-database-fill-up"></i>',
        '<i class="bi bi-fuel-pump-diesel"></i>',
        '<i class="bi bi-rocket-takeoff"></i>',
        '<i class="bi bi-scissors"></i>'
    ];
}
createVariables();

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

var myCircles = document.getElementsByClassName("circleDiv");
shuffleArray(myIcons);
for (var i = 0; i < myCircles.length; i++) {
    myCircles[i].innerHTML = myIcons[i];
}

// GENERATE QUESTION
function generateQuestion() {
    if (myQuestions.length > 0) {
        var chosenIcon = myQuestions[Math.floor(Math.random() * myQuestions.length)];
        document.getElementById("myQuestion").innerHTML = "Find <span>" + chosenIcon + "</span> icon for Me!";
        const index = myQuestions.indexOf(chosenIcon);
        if (index > -1) {
            myQuestions.splice(index, 1);
        }
    }
    else {
        console.log("run out of Questions!");
    }
}

function gameEnd() {
    // prepare result message:
    var level = null;
    var strength = null;
    if (parseInt(document.getElementById("wrongScore").textContent) < 6) {
        level = "First";
        strength = "PERFECT";
    }
    else if (parseInt(document.getElementById("wrongScore").textContent) < 11) {
        level = "Second";
        strength = "GOOD";
    }
    else if (parseInt(document.getElementById("wrongScore").textContent) < 16) {
        level = "Third";
        strength = "NORMAL";
    }
    else {
        level = "Fourth";
        strength = "WEAK";
    }
    // New Condition:
    if (myQuestions.length < 1) {
        document.querySelector(".finalDiv").style.display = "flex";
        document.querySelector(".finalDiv").classList.add("flex-column", "justify-content-center", "align-items-center");
        document.getElementById("level").textContent = level;
        document.getElementById("strength").textContent = strength;
        document.getElementById("mistake").textContent = document.getElementById("wrongScore").textContent;
        document.getElementById("myQuestion").innerHTML = "GAME IS OVER";
    }
}

// HIDE ICONS - START GAME - SHOW FIRST QUESTION
document.querySelector(".startButton").addEventListener("click", function() {
    var mySymbols = document.getElementsByClassName("bi");
    for (var j = 0; j < myCircles.length; j++) {
        mySymbols[j].style.visibility = "hidden";
    }
    generateQuestion();
    document.querySelector(".startButton").disabled = true;
})

// RESTART GAME
document.querySelector(".restartButton").addEventListener("click", restartGame)

function restartGame() {
    var mySymbols = document.getElementsByClassName("bi");
    for (var j = 0; j < myCircles.length; j++) {
        mySymbols[j].style.visibility = "visible";
    }
    document.querySelector(".startButton").disabled = false;
    document.getElementById("wrongScore").textContent = "0";
    document.getElementById("correctScore").textContent = "0";
    document.getElementById("myQuestion").innerHTML = 'If you are ready, press <span>START</span> button';
    document.querySelector(".correctWrong").textContent = "correct & wrong";
    document.querySelector(".correctWrong").style.color = "gainsboro";
    createVariables();
}

// DEFINE FUNCTIONALITY FOR FINDING PROCESS - circleDiv
for (var l = 0; l < myCircles.length; l++) {
    myCircles[l].addEventListener("click", function() {
        // display icon:
        this.querySelector("i").classList.add("controlIcon");
        this.querySelector("i").style.visibility = "visible";
        // check if player found correct icon:
        var questionIcon = document.querySelector("#myQuestion span").textContent.toLowerCase();
        var currentIcon = document.querySelector(".controlIcon");
        if (this.innerHTML.includes(questionIcon)) {
            document.getElementById("correctScore").textContent = parseInt(document.getElementById("correctScore").textContent) + 1;
            currentIcon.classList.remove("controlIcon");
            // additional effects:
            document.querySelector(".correctWrong").textContent = "correct";
            document.querySelector(".correctWrong").style.color = "#367E18";
            document.querySelector(".nextButton").disabled = false;
        }
        else {
            document.getElementById("wrongScore").textContent = parseInt(document.getElementById("wrongScore").textContent) + 1;
            // change color of wrong icon and then disappear:
            currentIcon.classList.add("redIcon");
            // additional effects:
            document.querySelector(".correctWrong").textContent = "wrong";
            document.querySelector(".correctWrong").style.color = "red";
            document.querySelector(".nextButton").disabled = true;
            // go back to source color:
            setTimeout(function() {
                currentIcon.classList.remove("redIcon");
                currentIcon.style.visibility = "hidden";
                currentIcon.classList.remove("controlIcon");
            }, 1000)
        }
        gameEnd();
    })
}

// DEFINE FUNCTIONALITY FOR - NEXT BUTTON
document.querySelector(".nextButton").disabled = true;
document.querySelector(".nextButton").addEventListener("click", function() {
    if (document.querySelector(".correctWrong").textContent == "correct") {
        generateQuestion();
        document.querySelector(".correctWrong").textContent = "correct & wrong";
        document.querySelector(".correctWrong").style.color = "gainsboro";
        document.querySelector(".nextButton").disabled = true;
    }
})

// DEFINE FUNCTIONALITY FOR - RULE BUTTON
document.querySelector(".ruleButton").addEventListener("click", function() {
    document.querySelector(".rulesDiv").classList.toggle("displayRule");
})

// DEFINE FUNCTIONALITY FOR - QUIT AND NEXT ROUND BUTTONS
document.querySelector(".quitButton").addEventListener("click", function() {
    document.querySelector(".finalDiv").style.display = "none";
    document.querySelector(".refreshDiv").classList.add("showRefresh");
})

document.querySelector(".roundButton").addEventListener("click", function() {
    document.querySelector(".finalDiv").style.display = "none";
    restartGame();
})