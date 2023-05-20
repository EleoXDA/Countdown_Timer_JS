// select elements
const timeInput = document.querySelector('#time-input');
const startButton = document.querySelector('#start-btn');
const timerDisplay = document.querySelector('#timer-display');

let countdown;

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // check if timer should stop
        if(secondsLeft < 0) {
            clearInterval(countdown);
            alert('Timer Finished!');
            return;
        }

        // display time left
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;

    const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
    const time = parseInt(timeInput.value);
    if (!isNaN(time) && time > 0) {
        timer(time);
    } else {
        alert('Please enter a valid number!');
    }
});
