//reloading window
window.addEventListener('DOMContentLoaded', () => {
    t.innerText = "25:00";
    minutes = 25;
    seconds = 0;
});

// select which mode is active
const modeButtons = document.querySelectorAll('.Pomodoro, .shortBreak, .longBreak');
modeButtons.forEach(button => {
    button.addEventListener('click', function () {
        modeButtons.forEach(btn => btn.classList.remove('active')); 
        button.classList.add('active'); 
    });
});


//initialisation
let t = document.querySelector('.timer');
let minutes,seconds, countDown, isRunning=false;
let originalTime = {
    Pomodoro: { minutes: 25, seconds: 0 },
    shortBreak: { minutes: 5, seconds: 0 },
    longBreak: { minutes: 10, seconds: 0 }
};


//pomodoro button
document.querySelector('.Pomodoro').addEventListener('click', function () {
    clearInterval(countDown); 
    t.innerText = "25:00";
    minutes = 25;
    seconds = 0;
    isRunning = false; 
    start.innerText = "Start"; 
});

//short break button
document.querySelector('.shortBreak').addEventListener('click', function(){
    clearInterval(countDown); 
    t.innerText = "05:00";
    minutes = 5;
    seconds = 0;
    isRunning = false;
});


//long break button
document.querySelector('.longBreak').addEventListener('click', function(){
    clearInterval(countDown); 
    t.innerText = "10:00"
    minutes = 10;
    seconds = 0;
    isRunning = false;
});


//update display
function updateDisplay() {
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    t.innerText = formattedTime;
}


// working timer
function timer(){
    countDown = setInterval(() => {
        if(seconds == 0) {
            if(minutes == 0) {
                clearInterval(countDown);
                t.innerText = "00:00";
                alert("Time's up");
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}


//start and pause button
let start = document.querySelector('.start');
start.addEventListener('click', function() {
    if(isRunning) {
        clearInterval(countDown);
        isRunning = false;
        start.innerText = "Start";
    } else {
        timer();
        isRunning = true;
        start.innerText = "Pause";
    }
});


//reset button
let reset = document.querySelector('.reset');
reset.addEventListener('click', function() {
    clearInterval(countDown);
    isRunning = false;
    start.innerText = "Start";

    modeButtons.forEach(btn => {
        if(btn.classList.contains('active')) {
            const mode = btn.classList[1];
            t.innerText = `${originalTime[mode].minutes}:00`;
            minutes = originalTime[mode].minutes;
            seconds = originalTime[mode].seconds;  
            updateDisplay();
           return; 
        }
    });
});
